function swap(chars, i, j) {
  var tmp = chars[i];
  chars[i] = chars[j];
  chars[j] = tmp;
}

export default function getAnagrams(input) {
  var counter = [],
    anagrams = [],
    chars = input,
    length = chars.length,
    i;

  for (i = 0; i < length; i++) {
    counter[i] = 0;
  }

  anagrams.push(input.reverse().join(""));
  i = 0;
  while (i < length) {
    if (counter[i] < i) {
      swap(chars, i % 2 === 1 ? counter[i] : 0, i);
      counter[i]++;
      i = 0;
      anagrams.push(chars.join(""));
    } else {
      counter[i] = 0;
      i++;
    }
  }

  return anagrams;
}
