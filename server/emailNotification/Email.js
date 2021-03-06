const nodemailer = require('nodemailer');
require('dotenv').config();
const { primaryEmail, emailHeader, emailFooter } = require('./emailComponents');

let Email = class email {
  constructor(data){
    this.data = data;
  }
};

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 465,
  ignoreTLS: false,
  service:'yahoo',
  secure: false,
  auth: {
    user: `${primaryEmail}`,
    pass: process.env.YMAILPW,
  },
});

transporter.verify(error => {
  if (error) console.log(error);
  else console.log('Server is ready to take email messages.');
});

Email.prototype.sendResetPasswordToken = function (url, token){
  const message = {
    from: `"Johnsido Music" <${primaryEmail}>`,
    to: `"${this.data.firstName} ${this.data.lastName}" <${this.data.email}>` ,
    subject: `${this.data.firstName}, Reset Your Password | Johnsido Music`,
    html: `${emailHeader}
<tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:20px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            <h2>Hello ${this.data.firstName},</h2>
                              Please click on the following link to complete the process:
                              <a href='${url}/reset-password-step-2/${token}'>Reset your password</a><br>
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:0px 18px;color:#241c15;font-family:Helvetica;font-size:20px;font-weight:normal;text-align:center;word-break:break-word;"
                            valign="top"
                          >Or</td>
                        </tr>
                        <tr>
                          <td
                            style="padding:0px 18px 18px 18px;color:#241c15;font-family:Helvetica;font-size:20px;font-weight:normal;text-align:left;word-break:break-word;"
                            valign="top"
                          >
                           <p>Paste the URL below into your browser to complete the process:</p>
                              ${url}/reset-password-step-2/${token} 
                          </td>
                          <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:20px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                            <span>If you did not request this, please ignore this email and your password will remain unchanged.</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
    ${emailFooter}`,
  };
  transporter.sendMail(message, (err, info) => {
    if (err) console.log(err);
    else console.log('Reset Password Token Sent Via Email: ' + info.response);
  });
};

Email.prototype.sendResetPasswordSuccess = function () {
  const message = {
    from: `"Johnsido Music" <${primaryEmail}>`,
     to: `"${this.data.firstName} ${this.data.lastName}" <${this.data.email}>` ,
    subject: `${this.data.firstName}, You Have Successfully Reset Your Password | Johnsido Music`,
    html: `${emailHeader}
    <tr>
  <td
    valign="top"
    id="m_-5334885316815523950templateHeader"
    style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;padding-bottom:0"
  >
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    ></table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top"></td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse"
    >
      <tbody>
        <tr>
          <td valign="top">
            <table
              align="left"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td
                    style="padding-top:9px;padding-left:18px;padding-bottom:9px;padding-right:18px"
                  >
                    <table
                      border="0"
                      cellspacing="0"
                      width="100%"
                      style="min-width:100%!important;border:10px solid #ffffff;border-collapse:collapse"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:20px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                          >
                            <h2>Hello ${this.data.firstName},</h2>
                              You have successfully reset your password.
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:20px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                           If you did not reset your password, secure your account by resetting your password:
                           </td>
                        </tr>
                         <tr>
                          <td
                            style="padding:18px;color:#241c15;font-family:Helvetica;font-size:20px;font-weight:normal;text-align:left;word-break:break-word;line-height:150%"
                            valign="top"
                          >
                             <a href='https://john-sido.netlify.app/reset-password-step-1' style='background:#0060df;color:#fff;text-decoration:none;border:14px solid #0060df;border-left-width:50px;border-right-width:50px;display:inline-block' target='_blank'>
                                 Secure My Account Now
                                </a>
                           </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="min-width:100%;border-collapse:collapse;table-layout:fixed!important"
    >
      <tbody>
        <tr>
          <td style="min-width:100%;padding:9px 18px 18px">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="100%"
              style="min-width:100%;border-collapse:collapse"
            >
              <tbody>
                <tr>
                  <td>
                    <span></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </td>
</tr>
${emailFooter}
          `,
  };
  transporter.sendMail(message, (err, info) => {
    if (err) console.log(err);
    else console.log('Reset Password Success Sent Via Email: ' + info.response);
  });
};

module.exports = Email;
