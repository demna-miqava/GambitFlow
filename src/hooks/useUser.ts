export const useUser = () => {
  const user = {
    userName: "demnamikava",
    email: "demna.mikava@gmail.com",
    fullName: "Demna Mikava",
    joinedAt: "Jan 8, 2023",
    friendsCount: 15,
    image:
      "https://images.chesscomfiles.com/uploads/v1/user/221994941.525197ea.32x32o.bcf5a30749a9.jpg",
  };
  return {
    ...user,
  };
};
