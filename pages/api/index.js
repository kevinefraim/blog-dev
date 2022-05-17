import dbConnect from "utils/dbConnect";

dbConnect();

export default function handler(req, res) {
  return res.setHeader("Content-type", "text/html").send(`
    <h1>Api Home - Go to: </br> 
    - <a href='/api/notes'>api/notes</a>
    </h1>
    `);
}
