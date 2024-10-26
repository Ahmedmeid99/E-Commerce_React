import React from "react";
import styles from "./UserMenue.module.css";
import ListGroup from "react-bootstrap/ListGroup"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faGear,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faRightToBracket,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
import { useSelector } from "react-redux";

function UserMenue() {
  const { Customer } = useSelector((state) => state.customer);
  return (
    <>
    <div className={styles.Account_menue}>
      <ListGroup>
        {Customer&&<ListGroup.Item className={styles.item}>
          <FontAwesomeIcon icon={faGear} className={styles.icon} />
          <Link to="/Settings"> Settings </Link>
        </ListGroup.Item>}
        {Customer&&<ListGroup.Item className={styles.item}>
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
          <Link to="/CustomerInfo"> Acount information </Link>
        </ListGroup.Item>}
        {!Customer&&
        <ListGroup.Item className={styles.item}>
          <FontAwesomeIcon icon={faRightToBracket} className={styles.icon} />
          <Link to="/Login"> Login </Link>
        </ListGroup.Item>}
        {!Customer&&<ListGroup.Item className={styles.item}>
          <FontAwesomeIcon icon={faArrowRightToBracket} className={styles.icon} />
          <Link to="/Signup"> Sigin up </Link>
        </ListGroup.Item>
        }
        {Customer&&<ListGroup.Item className={styles.item}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className={styles.icon} />
          <Link to="/Signup"> Logout  </Link>
        </ListGroup.Item>
        }
      </ListGroup>
      
    </div>
    </>
  );
}

export default UserMenue;
