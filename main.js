// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,
    mutate() {
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[randIndex] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randIndex] = newBase;
      return this.dna;
    },
    compareDNA(otherSpec) {
      let similarities = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherSpec.dna[i]) {
          similarities++;
        }
      }
      // console.log(similarities);
      const percentShared = (similarities / this.dna.length) * 100;
      // console.log(percentShared);
      const percentTo2Deci = percentShared.toFixed(2);
      console.log(`Specimen #${this.specimenNum} and Specimen #${otherSpec.specimenNum} have ${percentTo2Deci}% DNA in common.`);
    },
    willLikelySurvive() {
      const cOrG = this.dna.filter(bases => bases === 'C' || bases === 'G');
      return cOrG.length / this.dna.length >= 0.6;
    },
    complementStrand() {
      let complementingStrand = [];
      for (let i = 0; i < this.dna.length; i++) {
        switch (this.dna[i]) {
          case 'A':
            complementingStrand.push('T');
            break;
          case 'T':
            complementingStrand.push('A');
            break;
          case 'C':
            complementingStrand.push('G');
            break;
          case 'G':
            complementingStrand.push('C');
            break;
        }
      }
      return complementingStrand;
    }
  }
}

const survivingSpec = [];
let specimenCounter = 1;

while (survivingSpec.length < 30) {
  let newOrg = pAequorFactory(specimenCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpec.push(newOrg);
  }
  specimenCounter++;
}

// console.log(survivingSpec);

const specimenOne = pAequorFactory(1, mockUpStrand());
console.log(specimenOne.dna);
console.log(specimenOne.complementStrand());