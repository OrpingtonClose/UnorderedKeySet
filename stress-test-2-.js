var { Web3 } = require('web3');

var web3 = new Web3('http://localhost:8545');

var contractAddress = '0x704aB7DAA1442a0176c95FcDf6264517adA75354';
var privateKey = '0x000000000000000000000000000000000000000000000000000000000000002a';
var contract = new web3.eth.Contract([{"inputs":[{"internalType":"uint256","name":"N_NATIONKEY","type":"uint256"},{"internalType":"string","name":"N_NAME","type":"string"},{"internalType":"uint256","name":"N_REGIONKEY","type":"uint256"},{"internalType":"string","name":"N_COMMENT","type":"string"}],"name":"newNation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"N_NATIONKEY","type":"uint256"}],"name":"remWidget","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"N_NATIONKEY","type":"uint256"},{"internalType":"string","name":"N_NAME","type":"string"},{"internalType":"uint256","name":"N_REGIONKEY","type":"uint256"},{"internalType":"string","name":"N_COMMENT","type":"string"}],"name":"updateWidget","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getCount","outputs":[{"internalType":"uint256","name":"count","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"N_NATIONKEY","type":"uint256"}],"name":"getWidget","outputs":[{"internalType":"string","name":"N_NAME","type":"string"},{"internalType":"uint256","name":"N_REGIONKEY","type":"uint256"},{"internalType":"string","name":"N_COMMENT","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getWidgetAtIndex","outputs":[{"internalType":"uint256","name":"key","type":"uint256"}],"stateMutability":"view","type":"function"}]
                                      ,contractAddress );


var fromAddress = account.address;

async function sendTransaction(data) {
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  //const gasPrice = await web3.eth.getGasPrice();
  const gasPrice = 0;
  const transaction = {
    from: fromAddress,
    to: contractAddress,
    data: data,
    gas: 1000000000000,
    gasPrice: gasPrice,
    nonce: nonce,
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

  return receipt;
}

// Function to fill the newNation function with data
async function fillNewNationData(N_NATIONKEY, N_NAME, N_REGIONKEY, N_COMMENT) {
  const encodedData = contract.methods.newNation(N_NATIONKEY, N_NAME, N_REGIONKEY, N_COMMENT).encodeABI();
  const receipt = await sendTransaction(encodedData);

  return receipt;
}

const dataPoints = [
  [0, 'ALGERIA', 0, 'haggle. carefully final deposits detect slyly agai'],
  [1, 'ARGENTINA', 1, 'al foxes promise slyly according to the regular accounts. bold requests alon'],
  [2, 'BRAZIL', 1, 'y alongside of the pending deposits. carefully special packages are about the ironic forges. slyly special'],
  [3, 'CANADA', 1, 'eas hang ironic, silent packages. slyly regular packages are furiously over the tithes. fluffily bold'],
  [4, 'EGYPT', 4, 'y above the carefully unusual theodolites. final dugouts are quickly across the furiously regular d'],
  [5, 'ETHIOPIA', 0, 'ven packages wake quickly. regu'],
  [6, 'FRANCE', 3, 'refully final requests. regular, ironi'],
  [7, 'GERMANY', 3, 'l platelets. regular accounts x-ray: unusual, regular acco'],
  [8, 'INDIA', 2, 'ss excuses cajole slyly across the packages. deposits print aroun'],
  [9, 'INDONESIA', 2, 'slyly express asymptotes. regular deposits haggle slyly. carefully ironic hockey players sleep blithely. carefull'],
  [10, 'IRAN', 4, 'efully alongside of the slyly final dependencies.'],
  [11, 'IRAQ', 4, 'nic deposits boost atop the quickly final requests? quickly regula'],
  [12, 'JAPAN', 2, 'ously. final, express gifts cajole a'],
  [13, 'JORDAN', 4, 'ic deposits are blithely about the carefully regular pa'],
  [14, 'KENYA', 0, 'pending excuses haggle furiously deposits. pending, express pinto beans wake fluffily past t'],
  [15, 'MOROCCO', 0, 'rns. blithely bold courts among the closely regular packages use furiously bold platelets?'],
  [16, 'MOZAMBIQUE', 0, 's. ironic, unusual asymptotes wake blithely r'],
  [17, 'PERU', 1, 'platelets. blithely pending dependencies use fluffily across the even pinto beans. carefully silent accoun'],
  [18, 'CHINA', 2, 'c dependencies. furiously express notornis sleep slyly regular accounts. ideas sleep. depos'],
  [19, 'ROMANIA', 3, 'ular asymptotes are about the furious multipliers. express dependencies nag above the ironically ironic account'],
  [20, 'SAUDI ARABIA', 4, 'ts. silent requests haggle. closely express packages sleep across the blithely'],
  [21, 'VIETNAM', 2, 'hely enticingly express accounts. even, final '],
  [22, 'RUSSIA', 3, ' requests against the platelets use never according to the quickly regular pint'],
  [23, 'UNITED KINGDOM', 3, 'eans boost carefully special requests. accounts are. carefull'],
  [24, 'UNITED STATES', 1, 'y final packages. slow foxes cajole quickly. quickly silent platelets breach ironic accounts. unusual pinto be'],
];

function generateRandomWord() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const length = Math.floor(Math.random() * 8) + 1;
  let word = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    word += characters[randomIndex];
  }

  return word;
}

// Generate random sentence
function generateRandomSentence(wordCount) {
  const words = [];
  if (typeof(wordCount) == "undefined") { var wordCount = Math.floor(Math.random() * 10) + 1 }

  for (let i = 0; i < wordCount; i++) {
    words.push(generateRandomWord());
  }

  return words.join(' ');
}

// Generate random number
function generateRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

async function main() {
  for (const data of dataPoints) {
    try {
      const receipt = await fillNewNationData(data[0], data[1], data[2], data[3]);
      console.log(`Transaction receipt for data point ${data[0]}:${data[1]}`, receipt);
    } catch (error) {
        console.error('Error:', error);
    }
  }
}

//main();

async function main1() {
  var i = 200000000
  while (true) {
    try {
      const N_NATIONKEY = i++;
      const N_NAME = generateRandomWord().toUpperCase();
      const N_REGIONKEY = generateRandomNumber(5);
      const N_COMMENT = generateRandomSentence();
      
      //var reeee = await fillNewNationData(i++, generateRandomWord().toUpperCase(), generateRandomNumber(5), generateRandomSentence());
      const receipt = await fillNewNationData(N_NATIONKEY, N_NAME, N_REGIONKEY, N_COMMENT);
      console.log(`Transaction receipt for test nation ${N_NATIONKEY}:${N_NAME}`, receipt);

    } catch (error) {
        console.error('Error:', error);
    }
    console.log(`=====================${i}==========================`)
  }
}

//main1()

async function checkGasLimit() {
  var gasLimit = (await web3.eth.getBlock("latest")).gasLimit;
  var i = 500;
  while (true) {
    try {
      i += 100
      const N_NATIONKEY = i;
      const N_NAME = generateRandomWord().toUpperCase();
      const N_REGIONKEY = generateRandomNumber(5);
      const N_COMMENT = generateRandomSentence(i++);
      
      //var reeee = await fillNewNationData(i++, generateRandomWord().toUpperCase(), generateRandomNumber(5), generateRandomSentence());
      const receipt = await fillNewNationData(N_NATIONKEY, N_NAME, N_REGIONKEY, N_COMMENT);
      console.log(`gasLimit: ${gasLimit}:gasUsed:${receipt.gasUsed}:${receipt.gasUsed/gasLimit}`, receipt);

    } catch (error) {
        console.error('Error:', error);
        if (error.reason == "out of gas") break;
    }
    console.log(`=====================${i}==========================`)
  }
}

checkGasLimit()
