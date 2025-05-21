//  import users from '../data/users.json' with { type: 'json' };

// export const loginController = (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const userData = users.find(
//       (user) => user.username === username && user.password === password
//     );
//     userData.token = "dfdf";
//     res.json(userData);
//   } catch (error) {
//     res.json("User not found!");
//   }
// };

import users from '../data/users.json' with { type: 'json' };

export const loginController = (req, res) => {
  const { username, password } = req.body;

  const userData = users.find(
    (user) => user.username === username && user.password === password
  );

  if (userData) {
    // success response
    userData.token = "dummy-token";
    return res.status(200).json({ user: userData });
  } else {
    //  fail response with proper status
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
