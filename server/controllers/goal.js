const dashboard = (req, res) => {
  return res.status(200).send('Dashboard route');
};

const goalController = { dashboard };

export default goalController;
