import {ImgVerifyCode} from './VerifyImg';
import {SMSVerifyCode} from './VerifySMS';
import {PhoneServiceVerifyCode} from './VerifyPhoneService';

interface IVerifyCode {
  ImgVerifyCode: any;
  SMSVerifyCode: any;
  PhoneServiceVerifyCode: any;
}

const VerifyCode: IVerifyCode = {
  ImgVerifyCode,
  SMSVerifyCode,
  PhoneServiceVerifyCode
};
export default VerifyCode;
