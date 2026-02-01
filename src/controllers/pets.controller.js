import AppError from '../utils/AppError.js';

let pets = [];
let petIdCounter = 1;

export const createPet = (req, res, next) => {
  try {
    if (!req.user) {
      throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
    }

    const { name, species, breed, age } = req.body;

    if (!name || !species) {
      throw new AppError(
        'name and species are required',
        400,
        'VALIDATION_ERROR'
      );
    }

    const newPet = {
      id: petIdCounter++,
      ownerId: req.user.id,
      name,
      species,
      breed: breed || null,
      age: age || null,
      createdAt: new Date()
    };

    pets.push(newPet);

    res.status(201).json(newPet);
  } catch (error) {
    next(error);
  }
};

export const getMyPets = (req, res) => {
  const myPets = pets.filter(p => p.ownerId === req.user.id);
  res.json(myPets);
};
