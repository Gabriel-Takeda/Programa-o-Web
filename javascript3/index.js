class IntegerSet {
    constructor(maxValue) {
      this.maxValue = maxValue;
      this.set = new Array(maxValue + 1).fill(false);
    }
  
    insert(element) {
      if (element >= 0 && element <= this.maxValue) {
        this.set[element] = true;
      } else {
        throw new Error(`Element out of bounds (0-${this.maxValue})`);
      }
    }
  
    delete(element) {
      if (element >= 0 && element <= this.maxValue) {
        this.set[element] = false;
      } else {
        throw new Error(`Element out of bounds (0-${this.maxValue})`);
      }
    }
  
    union(otherSet) {
      const newMaxValue = Math.max(this.maxValue, otherSet.maxValue);
      const newSet = new IntegerSet(newMaxValue);
      for (let i = 0; i <= newMaxValue; i++) {
        newSet.set[i] = (i <= this.maxValue && this.set[i]) || (i <= otherSet.maxValue && otherSet.set[i]);
      }
      return newSet;
    }
  
    intersection(otherSet) {
      const newMaxValue = Math.max(this.maxValue, otherSet.maxValue);
      const newSet = new IntegerSet(newMaxValue);
      for (let i = 0; i <= newMaxValue; i++) {
        newSet.set[i] = (i <= this.maxValue && this.set[i]) && (i <= otherSet.maxValue && otherSet.set[i]);
      }
      return newSet;
    }
  
    difference(otherSet) {
      const newMaxValue = Math.max(this.maxValue, otherSet.maxValue);
      const newSet = new IntegerSet(newMaxValue);
      for (let i = 0; i <= newMaxValue; i++) {
        newSet.set[i] = (i <= this.maxValue && this.set[i]) && (!otherSet.set[i] || i > otherSet.maxValue);
      }
      return newSet;
    }
  
    toString() {
      let elements = [];
      for (let i = 0; i <= this.maxValue; i++) {
        if (this.set[i]) {
          elements.push(i);
        }
      }
      return `{${elements.join(', ')}}`;
    }
  }
  
  function teste() {
    const maximo1 = parseInt(prompt('Valor máximo para o primeiro conjunto'), 10);
    const set1 = new IntegerSet(maximo1);
    const numElements1 = parseInt(prompt('Quantidade de valores para o primeiro conjunto'), 10);
    for (let i = 0; i < numElements1; i++) {
      const element = parseInt(prompt(`Insira o valor ${i + 1} para o primeiro conjunto`), 10);
      try {
        set1.insert(element);
      } catch (e) {
        alert(e.message);
      }
    }
  
    const maximo2 = parseInt(prompt('Valor máximo para o segundo conjunto'), 10);
    const set2 = new IntegerSet(maximo2);
    const numElements2 = parseInt(prompt('Quantidade de valores para o segundo conjunto'), 10);
    for (let i = 0; i < numElements2; i++) {
      const element = parseInt(prompt(`Insira o valor ${i + 1} para o segundo conjunto`), 10);
      try {
        set2.insert(element);
      } catch (e) {
        alert(e.message);
      }
    }
  
    alert(`Set1: ${set1.toString()}`);
    alert(`Set2: ${set2.toString()}`);
  
    const unionSet = set1.union(set2);
    alert(`Union: ${unionSet.toString()}`);
  
    const intersectionSet = set1.intersection(set2);
    alert(`Intersection: ${intersectionSet.toString()}`);
  
    const differenceSet = set1.difference(set2);
    alert(`Difference (Set1 - Set2): ${differenceSet.toString()}`);
  }
  
teste()