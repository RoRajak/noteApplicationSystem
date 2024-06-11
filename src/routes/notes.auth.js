import {Note} from "../model/note.model.js";
import verifyJwt from "../middleware/auth.middleware.js";
import express from "express";
import jwtVerify from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", verifyJwt, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = new Note({
      title,
      content,
      user: req.user.id,
    });

    const note = await newNote.save();
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/all-notes", jwtVerify, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.put('/update/:id',verifyJwt,async(req,res)=>{
    const {title,content}=req.body;
   
    try {
        let note=await Note.findById(req.params.id);
        console.log(note);
        if (!note) {
            return res.json({msg:"note not found"})
        }

        


        if (note.user.toString()!==req.user.id) {
            return res.json({msg:"not authorized"})
        }

        note=await Note.findByIdAndUpdate(
            req.params.id,
            {$set:{title,content}},
            {new:true}
        )

        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


router.delete('/deleteNote/:id',verifyJwt,async(req,res)=>{
    try {
        let note= await Note.findById(req.params.id);
        if (!note) {
            return res.json({msg:"note not found"})
        }

        if(note.user.toString()!==req.user.id){
            return res.json({msg:"not authorized"})
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({msg:"notes removed"})
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

export default router;
