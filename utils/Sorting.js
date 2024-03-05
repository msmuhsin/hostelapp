import fs from 'fs';

export default function sortData() {
    const data = fs.readFileSync('./data/rawData.json');
    const jsonData = JSON.parse(data);

    const branchOfCE = jsonData.filter((row) => row.Branch === 'CE');
    const branchOfCSE = jsonData.filter((row) => row.Branch === 'CS');

    const branchwiseSortedData = [
        {
            branch: 'CE',
            data: branchOfCE
        },
        {
            branch: 'CS',
            data: branchOfCSE
        }
    ];

    console.log(JSON.stringify(branchwiseSortedData, null, 2));


}

sortData();