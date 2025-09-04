import ReCAPTCHA from 'react-google-recaptcha';

const ReCaptchaComponent = ({ setverified }) => {
  const handleOnChange = (value) => {
    console.log('Captcha value: ', value);
    setverified(true);
  };

  return (
    <>
      <div style={{ padding: '10px' }}>
        <ReCAPTCHA
          size="normal"
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};
export default ReCaptchaComponent;
