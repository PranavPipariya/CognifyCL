


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'entries.json');

app.use(cors());
app.use(bodyParser.json());


if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}


app.get('/entries', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

app.get('/entries/:category', (req, res) => {
  const category = req.params.category;
  const filePath = path.join(__dirname, 'categories', `entries_${category}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Category not found' });
  }

  const data = JSON.parse(fs.readFileSync(filePath));
  res.json(data);
});

app.post('/sync', (req, res) => {
  const newEntry = req.body;

 
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.unshift(newEntry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data.slice(0, 1000), null, 2));


  categorizeAndStore(newEntry);

   console.log("Received content:", newEntry);

  res.json({ status: 'ok' });
});


function categorizeAndStore(entry) {
  // Keywords per category
  const keywordMap = {
    Math: [
      'math', 'mathematics', 'algebra', 'geometry', 'trigonometry', 'calculus',
      'analysis', 'equation', 'formula', 'integral', 'derivative', 'limit',
      'probability', 'statistics', 'combinatorics', 'number theory', 'matrix',
      'linear algebra', 'proof', 'theorem', 'logic', 'graph theory'
    ],

    Programming: [
      'code', 'coding', 'programming', 'software', 'development', 'dev', 'frontend',
      'backend', 'fullstack', 'api', 'cli', 'framework', 'javascript', 'typescript',
      'react', 'nextjs', 'vue', 'svelte', 'angular', 'node', 'express', 'python',
      'django', 'flask', 'java', 'kotlin', 'c', 'c++', 'csharp', 'rust', 'go',
      'golang', 'swift', 'objective-c', 'php', 'laravel', 'ruby', 'rails', 'git',
      'github', 'docker', 'kubernetes', 'microservice', 'algorithm', 'datastructure',
      'leetcode'
    ],

    Watchmaking: [
      'watch', 'wristwatch', 'timepiece', 'horology', 'chronograph', 'chronometer',
      'movement', 'caliber', 'escapement', 'balance wheel', 'mainspring', 'tourbillon',
      'complication', 'dial', 'lug', 'bezel', 'crystal', 'crown', 'strap', 'bracelet',
      'gear train', 'jewel', 'automatic', 'manual wind', 'quartz', 'caseback'
    ],

    Drawing: [
      'draw', 'drawing', 'sketch', 'sketching', 'art', 'artist', 'illustrate',
      'illustration', 'doodle', 'ink', 'pen', 'pencil', 'charcoal', 'pastel',
      'watercolor', 'gouache', 'acrylic', 'oil paint', 'digital art', 'procreate',
      'photoshop', 'clip studio', 'brush', 'canvas', 'line art', 'figure', 'portrait'
    ],

    Woodworking: [
      'wood', 'woodwork', 'woodworking', 'carpentry', 'saw', 'table saw', 'bandsaw',
      'lathe', 'router', 'chisel', 'plane', 'sanding', 'joinery', 'dovetail', 'mortise',
      'tenon', 'cabinetry', 'lumber', 'timber', 'hardwood', 'softwood', 'plywood',
      'veneering', 'finish', 'varnish', 'stain', 'carve', 'woodturning', 'workbench'
    ],

    Piano: [
      'piano', 'pianist', 'keyboard', 'digital piano', 'grand piano', 'upright',
      'keys', 'pedal', 'sheet music', 'score', 'notation', 'chord', 'scale', 'arpeggio',
      'melody', 'harmony', 'practice', 'etude', 'sonata', 'concerto', 'improv',
      'performance', 'repertoire'
    ],

    Health: [
      'health', 'wellness', 'fitness', 'exercise', 'workout', 'gym', 'cardio', 'strength',
      'hiit', 'yoga', 'pilates', 'diet', 'nutrition', 'calorie', 'macro', 'protein',
      'sleep', 'recovery', 'mindfulness', 'meditation', 'mental health', 'therapy',
      'stress', 'anxiety', 'depression', 'pcos', 'hormone', 'cholesterol', 'blood pressure',
      'weight loss', 'fat loss'
    ],

    Science: [
      'science', 'scientific', 'research', 'study', 'paper', 'journal', 'experiment',
      'theory', 'hypothesis', 'physics', 'quantum', 'relativity', 'chemistry', 'organic',
      'inorganic', 'biology', 'genetics', 'neuroscience', 'psychology', 'cognitive',
      'astronomy', 'astrophysics', 'geology', 'earth science', 'climate', 'ecology',
      'medicine', 'immunology', 'biotech', 'innovation', 'lab'
    ],

    Games: [
      'game', 'gaming', 'videogame', 'video game', 'play', 'player', 'gamer', 'level',
      'quest', 'mission', 'boss', 'achievement', 'multiplayer', 'coop', 'online', 'fps',
      'tps', 'rpg', 'jrpg', 'strategy', 'moba', 'battle royale', 'sim', 'sandbox', 'indie',
      'steam', 'xbox', 'playstation', 'nintendo', 'switch', 'esports', 'tournament',
      'controller', 'keyboard-mouse'
    ],

    Miscellaneous: []
  };

 
  const text = (entry.summary || '').toLowerCase();
  if (!text) {
    storeEntry('Miscellaneous', entry);
    return;
     console.log("Received content:", entry);
  }


  const scores = {};
  let bestCategory = 'Miscellaneous';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(keywordMap)) {
    let score = 0;
    for (const kw of keywords) {
      if (text.includes(kw)) score += 1; 
    }
    scores[category] = score;

    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
      // console.log(score);
    }
  }

  storeEntry(bestCategory, entry);
}


function storeEntry(category, entry) {
  const categoryDir = path.join(__dirname, 'categories');
  if (!fs.existsSync(categoryDir)) fs.mkdirSync(categoryDir);

  const categoryFile = path.join(categoryDir, `entries_${category}.json`);
  let categoryData = [];
  if (fs.existsSync(categoryFile)) {
    categoryData = JSON.parse(fs.readFileSync(categoryFile));

     console.log("generated content:", categoryData);
  }

  categoryData.unshift(entry);
  fs.writeFileSync(categoryFile, JSON.stringify(categoryData.slice(0, 1000), null, 2));
}


app.post('/clear', (_req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));

  const categoryDir = path.join(__dirname, 'categories');
  if (fs.existsSync(categoryDir)) {
    for (const file of fs.readdirSync(categoryDir)) {
      if (file.startsWith('entries_') && file.endsWith('.json')) {
        fs.writeFileSync(path.join(categoryDir, file), JSON.stringify([]));
          console.log(categoryDir);
      }
    }
  }

  res.json({ status: 'cleared' });
});


app.listen(PORT, () => {
  console.log(`Sync Bridge Server running at http://localhost:${PORT}`);
});




