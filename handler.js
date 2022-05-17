import nextConnect from "next-connect";

export default nextConnect({
  onError(error, req, res) {
    res
      .status(405)
      .json({ ok: false, error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res
      .status(405)
      .json({ ok: false, error: `Method ${req.method} Not allowed` });
  },
});
