
export const STREAMS = [
  'Science (PCM)',
  'Science (PCB)',
  'Commerce',
  'Arts/Humanities'
];

export const EXAMS_BY_STREAM: { [key: string]: string[] } = {
  'Science (PCM)': [
    "JEE Main (Engineering)",
    "JEE Advanced (Engineering)",
    "NATA (Architecture)",
    "NDA (Defence)",
    "CUET (Central Universities)",
  ],
  'Science (PCB)': [
    "NEET (Medical)",
    "NDA (Defence)",
    "CUET (Central Universities)",
  ],
  'Commerce': [
    "CLAT (Law)",
    "NDA (Defence)",
    "CUET (Central Universities)",
  ],
  'Arts/Humanities': [
    "CLAT (Law)",
    "NDA (Defence)",
    "CUET (Central Universities)",
  ],
};


export const STUDY_STYLES = ["Active", "Passive"];
