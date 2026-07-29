import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const wb = XLSX.readFile('JFE_cau_hoi_da_sua_dap_an.xlsx');
const ws = wb.Sheets['Câu đã sửa'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1 });

// Row 0 is header: [Xếp hạng, Mức, Chương, Câu hỏi, A, B, C, D, Đáp án, Nội dung đáp án, Nguồn dùng, ...]
const HEADER_ROW = 0;
const questions = [];

for (let i = HEADER_ROW + 1; i < rows.length; i++) {
  const row = rows[i];
  if (!row || !row[0]) continue; // skip empty rows

  const rank    = row[0];  // Xếp hạng (số thứ tự)
  const level   = row[1];  // Mức
  const chapter = row[2];  // Chương
  const question = (row[3] || '').toString().trim();
  const optA    = (row[4] || '').toString().trim();
  const optB    = (row[5] || '').toString().trim();
  const optC    = (row[6] || '').toString().trim();
  const optD    = (row[7] || '').toString().trim();
  const answer  = (row[8] || '').toString().trim();
  const answerText = (row[9] || '').toString().trim();
  const source  = (row[10] || '').toString().trim();
  const reason  = (row[12] || '').toString().trim();

  if (!question || !answer) continue;

  questions.push({
    id: rank,
    rank: rank,
    level: level,
    chapter: chapter,
    question: question,
    options: { A: optA, B: optB, C: optC, D: optD },
    answer: answer,
    answerText: answerText,
    source: source,
    reason: reason,
  });
}

console.log(`Total questions parsed: ${questions.length}`);

const output = `window.JFE_QUESTIONS = ${JSON.stringify(questions)};\n`;
writeFileSync('questions.js', output, 'utf8');
console.log('questions.js written successfully!');
console.log('Sample first question:', JSON.stringify(questions[0], null, 2));
