export default function requireAuthentication(gssp) {
  return async (context) => {
    const { req, res } = context;
    console.log("inside authentication ................................");

    if (req.session.user != undefined || req.session.user != null) {
    } else {
      return {
        redirect: { permenent: false, destination: "/User/logout" },
      };
    }

    return await gssp(context);
  };
}
