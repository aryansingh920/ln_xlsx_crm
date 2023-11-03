import { Request, Response } from "express";

const home_get = (req: Request, res: Response) => {
  console.log(`
McAleer & Rushe:

Aidan Mc: aidan.mc@mcaleer-rushe.co.uk
John Higgins: john.higgins@mcaleer-rushe.co.uk
Michael Yohanis: michael.yohanis@mcaleer-rushe.co.uk
Declan Mc: declan.mc@mcaleer-rushe.co.uk
Gerald Laverty: gerald.laverty@mcaleer-rushe.co.uk
Steve Morris: steve.morris@mcaleer-rushe.co.uk
Eoin Gormley: eoin.gormley@mcaleer-rushe.co.uk
Paddy Connolly: paddy.connolly@mcaleer-rushe.co.uk
Daisy Butterworth: daisy.butterworth@mcaleer-rushe.co.uk
Sinead Gorman: sinead.gorman@mcaleer-rushe.co.uk
Nina Salandy: nina.salandy@mcaleer-rushe.co.uk
Peter Coyle: peter.coyle@mcaleer-rushe.co.uk
Orran Devine: orran.devine@mcaleer-rushe.co.uk
Niamh Heneghan: niamh.heneghan@mcaleer-rushe.co.uk
Thornton Roofing:

Eamonn Laverty: eamonn.laverty@thorntonroofing.co.uk`);
  res.render("home");
};

export default { home_get };
