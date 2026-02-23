/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  BarChart3, 
  Users, 
  Target, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Info
} from 'lucide-react';

// --- Types ---
type Education = '本科' | '硕士';
type Major = '理工' | '商科' | '文科';
type Skill = '数据分析' | '编程' | '表达能力' | '商业分析';
type Interest = '分析型' | '创意型' | '管理型' | '技术型';

interface UserProfile {
  education: Education;
  major: Major;
  skills: Skill[];
  interest: Interest;
}

interface CareerPath {
  id: number;
  education: Education;
  major: Major;
  skills: Skill[];
  interest: Interest;
  industry: '互联网' | '咨询' | '金融' | '快消' | '制造业';
  jobType: '产品' | '运营' | '数据分析' | '市场' | '咨询顾问';
}

// --- Mock Data (30 records) ---
const MOCK_DATA: CareerPath[] = [
  { id: 1, education: '本科', major: '理工', skills: ['编程', '数据分析'], interest: '技术型', industry: '互联网', jobType: '数据分析' },
  { id: 2, education: '硕士', major: '商科', skills: ['商业分析', '表达能力'], interest: '管理型', industry: '咨询', jobType: '咨询顾问' },
  { id: 3, education: '本科', major: '文科', skills: ['表达能力'], interest: '创意型', industry: '快消', jobType: '市场' },
  { id: 4, education: '硕士', major: '理工', skills: ['编程', '商业分析'], interest: '分析型', industry: '互联网', jobType: '产品' },
  { id: 5, education: '本科', major: '商科', skills: ['数据分析', '商业分析'], interest: '分析型', industry: '金融', jobType: '运营' },
  { id: 6, education: '硕士', major: '理工', skills: ['编程'], interest: '技术型', industry: '制造业', jobType: '产品' },
  { id: 7, education: '本科', major: '理工', skills: ['数据分析'], interest: '分析型', industry: '互联网', jobType: '运营' },
  { id: 8, education: '硕士', major: '商科', skills: ['表达能力', '商业分析'], interest: '管理型', industry: '金融', jobType: '市场' },
  { id: 9, education: '本科', major: '文科', skills: ['表达能力'], interest: '创意型', industry: '互联网', jobType: '运营' },
  { id: 10, education: '硕士', major: '理工', skills: ['编程', '数据分析'], interest: '技术型', industry: '互联网', jobType: '数据分析' },
  { id: 11, education: '本科', major: '商科', skills: ['商业分析'], interest: '分析型', industry: '快消', jobType: '产品' },
  { id: 12, education: '硕士', major: '文科', skills: ['表达能力'], interest: '管理型', industry: '咨询', jobType: '咨询顾问' },
  { id: 13, education: '本科', major: '理工', skills: ['编程'], interest: '技术型', industry: '制造业', jobType: '数据分析' },
  { id: 14, education: '硕士', major: '商科', skills: ['数据分析', '商业分析'], interest: '分析型', industry: '金融', jobType: '产品' },
  { id: 15, education: '本科', major: '文科', skills: ['表达能力'], interest: '创意型', industry: '快消', jobType: '市场' },
  { id: 16, education: '硕士', major: '理工', skills: ['编程', '表达能力'], interest: '管理型', industry: '互联网', jobType: '产品' },
  { id: 17, education: '本科', major: '商科', skills: ['商业分析'], interest: '分析型', industry: '咨询', jobType: '市场' },
  { id: 18, education: '硕士', major: '文科', skills: ['表达能力', '数据分析'], interest: '分析型', industry: '互联网', jobType: '运营' },
  { id: 19, education: '本科', major: '理工', skills: ['编程', '数据分析'], interest: '技术型', industry: '互联网', jobType: '产品' },
  { id: 20, education: '硕士', major: '商科', skills: ['商业分析'], interest: '管理型', industry: '快消', jobType: '运营' },
  { id: 21, education: '本科', major: '文科', skills: ['表达能力'], interest: '创意型', industry: '咨询', jobType: '咨询顾问' },
  { id: 22, education: '硕士', major: '理工', skills: ['数据分析'], interest: '分析型', industry: '制造业', jobType: '数据分析' },
  { id: 23, education: '本科', major: '商科', skills: ['商业分析', '表达能力'], interest: '管理型', industry: '金融', jobType: '市场' },
  { id: 24, education: '硕士', major: '文科', skills: ['表达能力'], interest: '创意型', industry: '互联网', jobType: '产品' },
  { id: 25, education: '本科', major: '理工', skills: ['编程'], interest: '技术型', industry: '互联网', jobType: '运营' },
  { id: 26, education: '硕士', major: '商科', skills: ['数据分析'], interest: '分析型', industry: '快消', jobType: '产品' },
  { id: 27, education: '本科', major: '文科', skills: ['表达能力', '商业分析'], interest: '分析型', industry: '咨询', jobType: '市场' },
  { id: 28, education: '硕士', major: '理工', skills: ['编程', '数据分析'], interest: '技术型', industry: '互联网', jobType: '数据分析' },
  { id: 29, education: '本科', major: '商科', skills: ['商业分析'], interest: '管理型', industry: '金融', jobType: '运营' },
  { id: 30, education: '硕士', major: '文科', skills: ['表达能力'], interest: '创意型', industry: '快消', jobType: '市场' },
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Layers className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-zinc-900">PathMatch</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
        <a href="#logic" className="hover:text-indigo-600 transition-colors">匹配逻辑</a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">项目文档</a>
      </div>
    </div>
  </nav>
);

const Hero = ({ onStart }: { onStart: () => void }) => (
  <section className="pt-32 pb-20 px-6">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
          MVP 展示站 · 产品经理作品集
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-900 tracking-tight mb-8 leading-tight">
          看见相似背景下的<br />
          <span className="text-indigo-600">职业路径可能性</span>
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          PathMatch 是一个基于多维标签匹配的职业路径可视化平台。我们通过分析真实职场人的背景数据，帮助大学生打破职业信息差，找到最适合自己的成长路径。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
          >
            开始匹配我的路径 <ChevronRight className="w-5 h-5" />
          </button>
          <a 
            href="#logic"
            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-600 font-semibold rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
          >
            了解产品逻辑
          </a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
      >
        <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
            <Target className="text-emerald-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-2">多维标签匹配</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            综合学历、专业、技能及兴趣倾向，从多个维度寻找与你背景最相似的职场前辈。
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <BarChart3 className="text-blue-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-2">路径可视化</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            直观展示行业分布与岗位类型，让复杂的职业选择变得一目了然。
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
            <Users className="text-purple-600 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-zinc-900 mb-2">打破信息茧房</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">
            解决职业路径不透明问题，为大学生提供真实、可参考的职业发展样本。
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProfileForm = ({ onSubmit }: { onSubmit: (profile: UserProfile) => void }) => {
  const [education, setEducation] = useState<Education>('本科');
  const [major, setMajor] = useState<Major>('理工');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interest, setInterest] = useState<Interest>('分析型');

  const toggleSkill = (skill: Skill) => {
    setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 md:p-12 rounded-3xl border border-zinc-100 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">填写你的画像</h2>
        <p className="text-zinc-500 mb-10">我们将根据这些信息为你匹配相似的职业路径</p>

        <div className="space-y-8">
          {/* Education */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-4">学历背景</label>
            <div className="grid grid-cols-2 gap-4">
              {(['本科', '硕士'] as Education[]).map(item => (
                <button
                  key={item}
                  onClick={() => setEducation(item)}
                  className={`py-3 rounded-xl border-2 transition-all ${
                    education === item 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                    : 'border-zinc-100 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Major */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-4">专业类别</label>
            <div className="grid grid-cols-3 gap-4">
              {(['理工', '商科', '文科'] as Major[]).map(item => (
                <button
                  key={item}
                  onClick={() => setMajor(item)}
                  className={`py-3 rounded-xl border-2 transition-all ${
                    major === item 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                    : 'border-zinc-100 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-4">核心技能 (多选)</label>
            <div className="flex flex-wrap gap-3">
              {(['数据分析', '编程', '表达能力', '商业分析'] as Skill[]).map(item => (
                <button
                  key={item}
                  onClick={() => toggleSkill(item)}
                  className={`px-4 py-2 rounded-full border-2 transition-all text-sm ${
                    skills.includes(item)
                    ? 'border-indigo-600 bg-indigo-600 text-white' 
                    : 'border-zinc-100 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Interest */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-4">兴趣倾向</label>
            <div className="grid grid-cols-2 gap-4">
              {(['分析型', '创意型', '管理型', '技术型'] as Interest[]).map(item => (
                <button
                  key={item}
                  onClick={() => setInterest(item)}
                  className={`py-3 rounded-xl border-2 transition-all ${
                    interest === item 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                    : 'border-zinc-100 bg-zinc-50 text-zinc-500 hover:border-zinc-200'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSubmit({ education, major, skills, interest })}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-4"
          >
            提交并查看匹配结果
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const ResultsPage = ({ profile, onBack }: { profile: UserProfile; onBack: () => void }) => {
  const results = useMemo(() => {
    // Simple matching logic: count matching tags
    const scored = MOCK_DATA.map(path => {
      let score = 0;
      if (path.education === profile.education) score += 1;
      if (path.major === profile.major) score += 1;
      if (path.interest === profile.interest) score += 1;
      const matchingSkills = path.skills.filter(s => profile.skills.includes(s));
      score += matchingSkills.length;
      return { ...path, score };
    }).sort((a, b) => b.score - a.score);

    const top5 = scored.slice(0, 5);
    
    // Calculate distributions
    const industryMap: Record<string, number> = {};
    const jobTypeMap: Record<string, number> = {};
    
    scored.slice(0, 15).forEach(p => {
      industryMap[p.industry] = (industryMap[p.industry] || 0) + 1;
      jobTypeMap[p.jobType] = (jobTypeMap[p.jobType] || 0) + 1;
    });

    return { top5, industryMap, jobTypeMap };
  }, [profile]);

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900">匹配结果</h2>
            <p className="text-zinc-500">基于你的画像，我们找到了最相似的职业路径分布</p>
          </div>
          <button 
            onClick={onBack}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            重新填写画像
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top 5 Paths */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-zinc-800 flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              相似度最高的 5 条真实路径
            </h3>
            {results.top5.map((path, idx) => (
              <div key={path.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-between group hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-400 font-bold">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded uppercase tracking-wider">
                        {path.industry}
                      </span>
                      <ArrowRight className="w-3 h-3 text-zinc-300" />
                      <span className="text-sm font-bold text-zinc-900">{path.jobType}</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      背景：{path.education} · {path.major} · {path.interest}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-zinc-400 block mb-1">匹配度</span>
                  <span className="text-lg font-bold text-indigo-600">{(path.score / 6 * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Distributions */}
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-800 mb-6 uppercase tracking-wider">行业分布 (Top 15)</h3>
              <div className="space-y-4">
                {(Object.entries(results.industryMap) as [string, number][]).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-zinc-600">{name}</span>
                      <span className="text-zinc-400">{((count / 15) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / 15) * 100}%` }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-800 mb-6 uppercase tracking-wider">岗位类型分布 (Top 15)</h3>
              <div className="space-y-4">
                {(Object.entries(results.jobTypeMap) as [string, number][]).sort((a, b) => b[1] - a[1]).map(([name, count]) => (
                  <div key={name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-medium text-zinc-600">{name}</span>
                      <span className="text-zinc-400">{((count / 15) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(count / 15) * 100}%` }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const LogicSection = () => (
  <section id="logic" className="py-20 px-6 bg-zinc-50 border-t border-zinc-100">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Info className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-zinc-900">产品逻辑说明</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-lg font-bold text-zinc-800 mb-4">MVP 阶段：规则匹配模型</h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-4">
            当前版本采用多维标签硬匹配逻辑。系统将用户的画像标签（学历、专业、技能、兴趣）与数据库中的职场路径进行逐一比对。
          </p>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
              <span>基础属性（学历、专业）权重：1.0</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
              <span>软性倾向（兴趣、技能）权重：1.0</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
              <span>匹配度 = (相同标签数 / 总标签数) * 100%</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-zinc-800 mb-4">未来迭代：权重推荐模型</h3>
          <p className="text-zinc-600 text-sm leading-relaxed mb-4">
            在 V2.0 阶段，我们将引入更复杂的权重计算与机器学习模型，以提供更精准的职业建议。
          </p>
          <ul className="space-y-2 text-sm text-zinc-500">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
              <span>动态权重：根据行业热门程度自动调整技能权重</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
              <span>协同过滤：基于“相似背景人群的最终去向”进行预测</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
              <span>路径演化：展示从第一份工作到当前职位的完整跃迁</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 px-6 border-t border-zinc-100 text-center">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Layers className="text-indigo-600 w-5 h-5" />
        <span className="text-lg font-bold tracking-tight text-zinc-900">PathMatch</span>
      </div>
      <p className="text-zinc-400 text-sm">
        © 2024 PathMatch · 产品经理个人项目展示 · MVP 1.0
      </p>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [step, setStep] = useState<'home' | 'form' | 'results'>('home');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleStart = () => setStep('form');
  const handleFormSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleBack = () => setStep('form');

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      
      <main>
        <AnimatePresence mode="wait">
          {step === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onStart={handleStart} />
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProfileForm onSubmit={handleFormSubmit} />
            </motion.div>
          )}

          {step === 'results' && userProfile && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsPage profile={userProfile} onBack={handleBack} />
            </motion.div>
          )}
        </AnimatePresence>

        <LogicSection />
      </main>

      <Footer />
    </div>
  );
}
