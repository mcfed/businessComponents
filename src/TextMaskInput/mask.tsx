import emailMask from 'text-mask-addons/dist/emailMask';
// import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import ipPipe, {createAutoCorrectedDatePipe} from './pipe';
const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/dd/yyyy HH:MM');
const phoneMask = [
  1,
  /[3-9]/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/
];
const dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
const ipMask = [
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/,
  '.',
  /\d/,
  /\d/,
  /\d/
];
const masks = {
  phone: {mask: phoneMask},
  email: {mask: emailMask},
  date: {mask: dateMask, pipe: autoCorrectedDatePipe},
  ip: {mask: ipMask, pipe: ipPipe(), keepCharPositions: true}
};

export default masks;
