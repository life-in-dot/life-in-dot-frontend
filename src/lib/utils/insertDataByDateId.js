export default function insertDataByDateId(dataArray, targetArray) {
  const copiedTargetArray = [];

  for (let i = 0; i < targetArray.length; i++) {
    const copiedObj = { ...targetArray[i] };

    copiedTargetArray.push(copiedObj);
  }

  const targetDataArray = dataArray.map((dataObj, i, array) => {
    const { dateId, _id } = dataObj;

    for (let i = 0; i < copiedTargetArray.length; i++) {
      if (dateId === copiedTargetArray[i].dateId) {
        copiedTargetArray[i].journalId = _id;
      }
    }

    return copiedTargetArray;
  });

  return targetDataArray[0];
}
