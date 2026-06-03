const getFrontendUrl = require("./frontendUrl");

const verificationEmailTemplate = (verificationToken) => {
  const frontend = getFrontendUrl();
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-rrsbq2enu-resend.vercel.app/static/collage/collage-image-1.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-rrsbq2enu-resend.vercel.app/static/shared/social-x-black.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-rrsbq2enu-resend.vercel.app/static/shared/social-in-black.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-rrsbq2enu-resend.vercel.app/static/shared/social-yt-black.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-rrsbq2enu-resend.vercel.app/static/shared/social-gh-black.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      @media (max-width:600px){.mobile_px-6imprtnt{padding-right:1.5rem!important;padding-left:1.5rem!important}}
    </style>
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 300;
        mso-font-alt: 'Arial';
        src: url(https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZg.ttf) format('truetype');
      }

      * {
        font-family: 'Inter', Arial, sans-serif;
      }
    </style>
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        mso-font-alt: 'Arial';
        src: url(https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2) format('woff2');
      }

      * {
        font-family: 'Inter', Arial, sans-serif;
      }
    </style>
    <style>
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        mso-font-alt: 'Arial';
        src: url(https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf) format('truetype');
      }

      * {
        font-family: 'Inter', Arial, sans-serif;
      }
    </style>
  </head>
  <body style="background-color:rgb(251,252,251);margin:0;padding:0">
    <!--$--><!--html--><!--head--><!--body-->
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td
            style="background-color:rgb(251,252,251);font-size:14px;line-height:1.5;font-family:Inter,Arial,sans-serif;color:rgb(16,59,5);margin:0rem;padding:0rem">
            <div
              style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
              data-skip-in-text="true">
              Confirm your email address
              <div>
                 ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
              </div>
            </div>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:640px;margin-right:auto;margin-left:auto">
              <tbody>
                <tr style="width:100%">
                  <td
                    style="padding-right:1rem;padding-left:1rem;padding-top:4rem;padding-bottom:1.5rem">
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="box-shadow:0 0 rgb(0,0,0,0),0 0 rgb(0,0,0,0),0 0 rgb(0,0,0,0),0 0 rgb(0,0,0,0),0px 76px 21px 0px var(--tw-shadow-color, rgba(193,195,193,0)),0px 49px 19px 0px var(--tw-shadow-color, rgba(193,195,193,0.01)),0px 27px 16px 0px var(--tw-shadow-color, rgba(193,195,193,0.05)),0px 12px 12px 0px var(--tw-shadow-color, rgba(193,195,193,0.09)),0px 3px 7px 0px var(--tw-shadow-color, rgba(193,195,193,0.1));border-radius:8px">
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="background-color:rgb(255,255,255);border-color:rgb(216,225,212);border-radius:8px;border-style:solid;border-width:1px">
                              <tbody>
                                <tr>
                                  <td>
                                    <table
                                      align="center"
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      class="mobile_px-6imprtnt"
                                      style="padding-right:2.5rem;padding-left:2.5rem;padding-top:4rem">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <img
                                              alt=""
                                              height="111"
                                              src="https://react-email-demo-rrsbq2enu-resend.vercel.app/static/collage/collage-image-1.png"
                                              style="display:block;outline:none;border:none;text-decoration:none;border-style:none"
                                              width="148" />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      align="center"
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      class="mobile_px-6imprtnt"
                                      style="padding-right:2.5rem;padding-left:2.5rem;padding-top:2rem">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table
                                              align="center"
                                              width="100%"
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              role="presentation"
                                              style="margin-bottom:2.25rem">
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <p
                                                      style="font-size:48px;line-height:1;letter-spacing:-1.44px;color:rgb(16,59,5);margin:0rem;font-family:Arial,Helvetica,sans-serif;margin-top:0rem;margin-bottom:0rem;margin-left:0rem;margin-right:0rem">
                                                      Almost there
                                                    </p>
                                                    <p
                                                      style="font-size:14px;line-height:1.5;font-family:Inter,Arial,sans-serif;color:rgb(25,74,7);margin:0rem;margin-top:18px;margin-bottom:0rem;margin-left:0rem;margin-right:0rem">
                                                      Thank you for signing up
                                                      for Meeting Manager!
                                                    </p>
                                                    <p
                                                      style="font-size:14px;line-height:1.5;font-family:Inter,Arial,sans-serif;color:rgb(25,74,7);margin:0rem;margin-top:0rem;margin-bottom:0rem;margin-left:0rem;margin-right:0rem">
                                                      To verify your account, we
                                                      just need to confirm your
                                                      email
                                                    </p>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <a
                                              href="${frontend}/verify-email?token=${verificationToken}"
                                              style="line-height:1.5;text-decoration:none;display:inline-block;max-width:100%;mso-padding-alt:0px;background-color:rgb(16,59,5);font-size:15px;letter-spacing:-0.075px;font-weight:500;font-family:Inter,Arial,sans-serif;color:rgb(251,255,249);border-style:none;padding-right:20px;padding-left:20px;padding-bottom:14px;padding-top:14px;text-align:center"
                                              target="_blank"
                                              ><span
                                                ><!--[if mso]><i style="mso-font-width:500%;mso-text-raise:21" hidden>&#8202;&#8202;</i><![endif]--></span
                                              ><span
                                                style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:10.5px"
                                                >Confirm Email</span
                                              ><span
                                                ><!--[if mso]><i style="mso-font-width:500%" hidden>&#8202;&#8202;&#8203;</i><![endif]--></span
                                              ></a
                                            >
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <table
                                      align="center"
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      class="mobile_px-6imprtnt"
                                      style="padding-right:2.5rem;padding-left:2.5rem;padding-top:4rem;padding-bottom:2rem">
                                      <tbody>
                                        <tr>
                                          <td>
                                            <p
                                              style="font-size:11px;line-height:1.5;letter-spacing:-0.033px;font-weight:300;font-family:Inter,Arial,sans-serif;color:rgb(134,156,127);margin:0rem;max-width:310px;margin-top:0rem;margin-bottom:0rem;margin-left:0rem;margin-right:0rem">
                                              If you didn&#x27;t create an
                                              account, you can safely ignore
                                              this email.
                                            </p>
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
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`;
};

module.exports = verificationEmailTemplate;
