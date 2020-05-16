const config = {
  application: {
    cors: {
      server: [
        {
          origin: "https://coronavirusmetting.herokuapp.com", //servidor que deseas que consuma o (*) en caso que sea acceso libre
          credentials: true,
        },
      ],
    },
  },
};
