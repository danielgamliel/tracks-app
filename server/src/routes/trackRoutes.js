import express from 'express';
import mongoose from 'mongoose';
import requireAuth from '../middleware/requireAuth.js'; 

const router = express.Router();
const Track = mongoose.model('Track'); 

 router.use(requireAuth); 

router.get('/tracks', requireAuth, async (req, res) => { 
  try {
    const tracks = await Track.find({ userId: req.user._id });
    res.send(tracks);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post('/tracks', requireAuth, async (req, res) => { // Fix order of parameters
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res.status(422).send({ error: 'You must provide a name and locations' });
  }
  
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});


router.delete('/tracks/:id', async (req, res) => {
  try {
    const { id } = req.params; 
    const track = await Track.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!track) {
      console.log('Track not found or you do not have permission to delete it');
      return res.status(404).send({ error: 'Track not found or you do not have permission to delete it' });
    }

    res.send({ message: 'Track deleted successfully' });
    console.log('Track deleted successfully');
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

export default router;
