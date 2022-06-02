import {uploadarrtos3,gets3files,gets3file,gets3fileheadobject} from '../AWSLOGIC/s3logic';
import{token,email,userid,phone}from '../AWSLOGIC/sessonstate';
import{searchforsim} from '../AWSLOGIC/rekognitionlogic';
import {getfromdynamodb,quaryfromdynamodb} from '../AWSLOGIC/dynamodblogic'
export async function Getmatches(photosnamearr)
{
    const matchesset = new Set()
    for(let i=0;i<photosnamearr.length;i++)
    {
        const z= await searchforsim("waitingslistfaces","lostchildrenbucket",photosnamearr[i],token);
        for (let j = 0; j< z.length; j++)
        {
            matchesset.add(z[j])

        }
    }
    const photoidarr=[]
    matchesset.forEach(v => photoidarr.push(v));
    var y=await gets3file(token,photoidarr,null,"passerbybucket");
    const metadataarr=[];
    const matchesmap = new Map();
    for (let i=0;i<photoidarr.length;i++)
    {
    
       var x=await gets3fileheadobject(photoidarr[i], null, "passerbybucket")
       const metdata=JSON.stringify({
        lat:x["Metadata"]["lat"],
        name:x["Metadata"]["name"],
        lng:x["Metadata"]["lng"],
        writenaddress:x["Metadata"]["writenaddress"],
        phonenumber:x["Metadata"]["phonenumber"],
        })
        if(matchesmap.has(metdata))
        {
            const uriarr=matchesmap.get(metdata)
            uriarr.push(y[i])
            matchesmap.set(metdata,uriarr)


        }
        else
        {
            matchesmap.set(metdata,[y[i]])
        }
        metadataarr.push(x["Metadata"])
        
    }
    const outarr=[]
    for (const i of matchesmap.entries()) {
        const out={
            photosuri:i[1],
            metadata:JSON.parse(i[0])

        }
        outarr.push(out)
      }
    console.log("neeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",outarr)
    
   const output={
        photosuri:y,
        metadata:metadataarr
    }
    
    
    
    return outarr;
     

}
export async function Getmatchesitem(itemtype,id)
{
    console.log(itemtype);
    console.log(id);
    const match=await getfromdynamodb("itemsfound",itemtype,id,token);
    return match
}


