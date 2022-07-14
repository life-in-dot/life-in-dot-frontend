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
    const { dateId, _id, title, contents, contentsSize, musicUrl } = dataObj;

    for (let i = 0; i < copiedTargetArray.length; i++) {
      if (dateId === copiedTargetArray[i].dateId) {
        copiedTargetArray[i].journalId = _id;
        copiedTargetArray[i].title = title;
        copiedTargetArray[i].contents = contents;
        copiedTargetArray[i].contentsSize = contents ? contents.length : 0;
        copiedTargetArray[i].musicUrl = musicUrl;
      }
    }

    return copiedTargetArray;
  });

  return targetDataArray[0];
}
