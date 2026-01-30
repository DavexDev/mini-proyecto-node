let pets = [];
let petIdCounter = 1;

// POST /pets
export const createPet = (req, res) => {
  const { name, species, breed, age } = req.body;

  // Validación estricta mínima
  if (!name || !species) {
    return res.status(400).json({
      error: 'name and species are required'
    });
  }

  const newPet = {
    id: petIdCounter++,
    ownerId: req.user.id, // 🔐 clave
    name,
    species,
    breed: breed || null,
    age: age || null,
    createdAt: new Date()
  };

  pets.push(newPet);

  res.status(201).json(newPet);
};

// GET /pets
export const getMyPets = (req, res) => {
  const myPets = pets.filter(
    pet => pet.ownerId === req.user.id
  );

  res.json(myPets);
};
