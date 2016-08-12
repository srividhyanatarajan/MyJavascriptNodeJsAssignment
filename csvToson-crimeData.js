
const readline = require('readline');
const fs = require('fs');

var val=[];
var isOver=[],isUnder=[];
var trueArrest=[],falseArrest=[];
var year=[];
var firstJson=[],secondJson=[];

var i=0,j=0;
for(i=2001;i<=2016;i++)
{
 isOver[i]=0;
 isUnder[i]=0;
 trueArrest[i]=0;
 falseArrest[i]=0;
}

const rl = readline.createInterface({
input: fs.createReadStream('crimes2001onwards.csv')

});
var outstream1 = fs.createWriteStream('chicagocrime.json');
var outstream2 = fs.createWriteStream('chicagocrime2.json');
rl.on('line',function(line)
{
   var entireData=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);


for(i=2001;i<=2016;i++)
{

  if(" "+entireData[17]==" "+i && entireData[5]=="THEFT")
  {

    if(entireData[6]=="OVER $500")
    {

      isOver[i]++;
    }
     if(entireData[6]=="$500 AND UNDER")
     {

       isUnder[i]++;
     }
      }

     if(" "+entireData[17]==" "+i && entireData[8].trim()=="true" && entireData[5]=="ASSAULT"){
           trueArrest[i]++;
     }

     if (" "+entireData[17]==" "+i && entireData[8].trim()=="false" && entireData[5]=="ASSAULT") {
           falseArrest[i]++;
     }
}
});

rl.on('close',function()
{

  for(j=2001;j<=2016;j++)
  {
    tempData1={};
    tempData1["year"]=j;
    tempData1["above$500"]=isOver[j];
    tempData1["below$500"]=isUnder[j];

    firstJson.push(tempData1);

    tempData2={};
    tempData2["year"]=j;
    tempData2["Arrested"]=trueArrest[j];
    tempData2["NotArrested"]=falseArrest[j];

    secondJson.push(tempData2);
}

console.log(firstJson);
console.log(secondJson);


outstream1.write(JSON.stringify(firstJson),encoding="utf8")
outstream2.write(JSON.stringify(secondJson),encoding="utf8")

});
