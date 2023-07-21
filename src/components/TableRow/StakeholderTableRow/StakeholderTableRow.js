import { useNavigate } from "react-router-dom";
import "./StakeholderTableRow.scss";

const StakeholderTableRow = ({ stakeholderInfo }) => {
  const nav = useNavigate();
  const firstStakeholder = stakeholderInfo[0]; // Accessing the first object

  function selectStakeholder(stakeholder) {
    window.scrollTo(0, 0);
    nav(`/stakeholders/${stakeholder.NAME}`, {
      state: {
        stakeholder: firstStakeholder,
      },
    });
  }

  function getInterestList(array) {
    const listItems = array.map((element, index) => (
      <li key={index}>{element.NAME}</li>
    ));

    return listItems.length;
  }

  let location = firstStakeholder.MAILING.split(",");
  let attempts = firstStakeholder.ATTEMPTS.split(",");

  return (
    <tr onClick={() => selectStakeholder(firstStakeholder)}>

      <td>{firstStakeholder.NAME}</td>
      <td className="location-cell">
        {location.length >= 3 ? location[location.length - 3] : "N/A"},
        {location.length >= 3 ? location[location.length - 2] : "N/A"}
      </td>
      <td>
        {firstStakeholder.CONTACT === "GREEN" && (
          <div className="dot green-dot" />
        )}
        {firstStakeholder.CONTACT === "YELLOW" && (
          <div className="dot yellow-dot" />
        )}
        {firstStakeholder.CONTACT === "RED" && (
          <div className="dot red-dot" />
        )}
      </td>
      <td className="interest-cell">
        {getInterestList(stakeholderInfo)}
      </td>
      <td>{firstStakeholder.PHONE.length > 1 ? "YES" : "NO"}</td>
      <td>{attempts[0] !== "" ? attempts.length : 0}</td>
      <td>
        {firstStakeholder.CONTACTED === "YES" ? <av>Yes</av> : <a>No</a>}
      </td>
    </tr>
  );
};

export default StakeholderTableRow;
