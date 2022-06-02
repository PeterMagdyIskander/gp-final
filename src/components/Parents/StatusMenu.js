import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { quaryfromdynamodb ,quaryfromdynamodbgetitem} from "../../AWS/dynamodblogic";
import StatusCard from "../Cards/StatusCard";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "@mui/material";
import { gets3file } from "../../AWS/s3logic";
import MatchedCard from "../Cards/MatchedCard";
import ItemsCard from "../Cards/ItemsCard";
const StatusMenu = (props) => {
  const [children, setChildren] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(() => {
    console.log(props.authedUser);
    quaryfromdynamodb(
      "userdata",
      props.authedUser.email,
      props.authedUser.jwtToken
    ).then(async (res) => {
      let completedStatus = [...res];
      for (let i = 0; i < completedStatus.length; i++) {
        let images = await gets3file(
          completedStatus[i].photos,
          props.authedUser.jwtToken,
          "lostchildrenbucket"
        );
        let selectedImages = images.map((img) => {
          return { img, selected: false };
        });
        completedStatus[i].photos = selectedImages;
        completedStatus[i].matches = [
          {
            photosuri: [
              "https://lostchildrenbucket.s3.us-east-1.amazonaws.com/7b323271-b644-4f9b-9ac8-46e444dd6fdbPeter0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA2PS4KYD55YM5IP6H%2F20220601%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220601T223152Z&X-Amz-Expires=36000&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFcaCXVzLWVhc3QtMSJHMEUCIQDnFYlEIswZzARzSacs8M71h6y4dB1V878F11yaoSUeiQIgWhoQI5Zoa0LuJoMsy%2Flv2k7ZlPsSU6o7hTO9LJPoCbYqkQYIUBABGgw3MjA2NzQ0MDY2NTEiDBnDpWwbPhb8NB%2BkSCruBW5%2BBq%2FboRSCjntVJgmK%2B%2BCplAHyVegwSMWDKFuXiDpM9lO%2FSGY7r9CS5qULF%2B4HAJwgNkUmKVfvfabBVgH7Papv3kmY8c2P8pAlV8iFFW5d%2B8zwAQco%2F%2BrJkjiJ3Wtfj6XuMnRXC72gZWyEyccqNIKppbFBc52o2o06yEO%2BEbe%2FS5V2C6yNiShT1JvitpwD1M67xzLc%2FuV0CK%2B7btkEIpx87xA5Pp3ewL8WrPE7sFuIAZLvB%2BBJu7G6geyzx4VUxoenJu%2BQWelxMHpotL%2BCdLJ8f6yFYwI4hnQWQzFnF6ZrnoCTYugv%2FlbrBB%2BmhAibfFSXdJpNLZ9qwOHSL3bieGwCSqwy2RHw2RZ3bZh60b4GAYbeO5TPGiQ2t4YbCWGRx%2FFZBsKvEv4vITCSy3NuV4CM8zhpG9cGC5TY3L4zVw%2FKJIPtoWSRLwAJsNi7Cn3dpoRZI9f41rZhCMJIln4032GorL7bmIZBPNCgfOBPKJPw%2BP4zk8vLrIJlrMntlHZRujkMQnlBL2aVhj1Gzc5n79gXoiXsp25SLOyUWEVtRtvuvC0k3%2BizbxAO%2BnAzY3a%2Fq1jmCapHI49ZEFXAW6KBudCqBJm45GxKDugTa5Q3oCdEPHLr2f693pZR%2FNgirrjxgn4tQ0HporQq9uJ2S3n8UJv5CmkLYbcywm5LDvKxoIPKUNsKWWhfxiEeLanbAuh83e8CQ9wStHquTQ6ZudTAkPGgSntyx7iQLb2QAlMb9D6oRHmsTVVzFDDjEQzWFmn0l274fSrCipUOPIm7068z%2BUgWgbRGAA0RWcXc7rXbcqRizKVooR2W%2Bhxgyyui0%2BdlCw2Hds4oBR6InUY3f43Uq4F29tHnC8VRbwiSVoTBxS0xetUP9Pnefg2qywHxOGJeWHxGrc7RwzEEMIrImthctBI1HkRNVXC6nHjgcCWJN5mS7bz4Z%2Be9NX8aDyJ6xf21S1inXcvkTUauNQRBZuD2zjp2Nywkp0otnB7Ct%2B%2Br%2FzDZ0d%2BUBjqHAlnRWtcHR%2FDeM6jPu5TuVx43XsUi%2BUEkbi8utTU7jSkxcTI1L9iipo%2FAAvVgL0YJruOY%2FqFFSoAeVzuxaxiS0qGw7Zzw7MZD%2FiO8mcBZm%2FDbXtuUMeZeah49xLp27aO6l%2B9vbZu4QTQ84vDiQtW2CP72JukT4IgkcO2A1EHifhg6z%2B8j16HFJnRJQ5K7NoAnwzHNtiIs%2BKRq5TJy%2BoH%2BhLypog9T8T9FWjhfH2d9tqN3WpHDMfyj1qmeiE5TiNc%2F9ItsjRgrx%2FKxHZ15EVfefKmWI88nSFnjC1v5b%2BmvHpGxhwH%2BVW%2B0p4x5g0eOlZJqvLlfE6%2FHTIP42bewsQASS7QijcZ4BN6E&X-Amz-Signature=1eadc0915fcf85c6bdc0537d12687813160845d579b5bcfde2f5f94e5e979738&X-Amz-SignedHeaders=host&x-id=GetObject",
            ],
            metadata: {
              address: "12 Genint el Hagar, Shoubra",
              lostchildid: "Peter",
              owner: "abadeer@hotmail.com",
              phonenumber: "+201271277073",
            },
          },
        ];
      }

      setChildren(completedStatus);

      //set items here
      
      
      setItems(await quaryfromdynamodbgetitem("itemslostuserdata", props.authedUser.email,props.authedUser.jwtToken));
      console.log("called", completedStatus, items);
      setLoading(false);
    });
  }, []);

  return (
    <Container
      sx={{
        mt: "64px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
      component="main"
    >
      {loading ? (
        <Skeleton
          variant="rectangular"
          height={234}
          sx={{ borderRadius: "30px" }}
          animation="wave"
        />
      ) : children.length === 0 ? (
        <MatchedCard img={"/assets/warning.png"} name="No Reports Found" />
      ) : (
        <>
          {children.map((child, index) => {
            return (
              <StatusCard
                key={index}
                child={{
                  imgs: child.photos,
                  nameOfChild: child.name,
                  ageOfChild: child.age,
                  location: child.Location,
                  status: child.match,
                  matches: child.matches,
                }}
                refresh={setRefresh}
                loading={setLoading}
              />
            );
          })}
          {items.map((item) => {
            return <ItemsCard id={item.id} type={item.type} key={item.id} />;
          })}
        </>
      )}
    </Container>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(StatusMenu);
