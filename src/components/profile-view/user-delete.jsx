import { Button } from "react-bootstrap";

export const UserDelete = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const apiURL = process.env.API_URL || "http://localhost:8080";

  const handleDelete = (event) => {
    event.preventDefault();

    const warning = confirm(
      "Are you sure that you want to delete your account?"
    );

    warning === false
      ? alert("Thanks for sticking around.")
      : fetch(`${apiURL}/users/${storedUser.Username}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              alert(
                `You successfully deleted the account with the username of '${storedUser.Username}'.`
              );
              localStorage.clear();
              window.location.reload();
            } else if (response.status === 400) {
              alert("User was not found.");
            } else if (response.status === 401) {
              alert("Access denied.");
            }
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
  };

  return (
    <Button onClick={handleDelete} variant="danger" className="ms-3 mt-3">
      Delete your account
    </Button>
  );
};
