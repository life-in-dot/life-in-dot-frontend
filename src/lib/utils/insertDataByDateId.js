export default function insertDataByDateId(dataArray, targetArray) {
  const copiedTargetArray = [];

  for (let i = 0; i < targetArray.length; i++) {
    const copiedObj = { ...targetArray[i] };

    copiedTargetArray.push(copiedObj);
  }

  if (!dataArray.length) {
    return copiedTargetArray;
  }

  const targetDataArray = dataArray.map((dataObj, i, array) => {
    const { dateId, _id, musicUrl } = dataObj;

    for (let i = 0; i < copiedTargetArray.length; i++) {
      if (dateId === copiedTargetArray[i].dateId) {
        copiedTargetArray[i].journalId = _id;
        copiedTargetArray[i].musicUrl = musicUrl;
      }
    }

    return copiedTargetArray;
  });

  return targetDataArray[0];
}
