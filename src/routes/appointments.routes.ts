import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const pardedDate = parseISO(date);

  const CreateAppointment = new CreateAppointmentService();
  const appointment = await CreateAppointment.execute({
    date: pardedDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointmentsRouter;
