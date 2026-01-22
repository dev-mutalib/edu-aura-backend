import Admission from '../models/Admission.js';

export const applyAdmission = async (req, res) => {
  const data = await Admission.create(req.body);
  res.status(201).json(data);
};
