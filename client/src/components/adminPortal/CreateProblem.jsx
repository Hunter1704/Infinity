import React from 'react';
import { useNavigate } from 'react-router';
import axiosClient from "../../config/axios";
import { useForm, useFieldArray } from 'react-hook-form';
import {
  PlusCircle, Trash2, X, ArrowRight,
  FileJson, Code, List, Tag, Building,
  Lightbulb, AlertCircle, MessageSquare
} from 'lucide-react';

const ProblemDifficulty = {
  Basic: 'Basic',
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
};

const problemTags = [
  "strings", "arrays", "linked-list", "stacks", "queues", "hash-maps", "sorting",
  "searching", "binary-search", "graphs", "trees", "dynamic-programming", "backtracking",
  "greedy", "heap", "bit-manipulation", "mathematical", "two-pointers", "sliding-window",
  "recursion", "design", "math", "other"
];

const codeLanguages = ["c", "cpp", "java", "python", "javascript"];

// --- Reusable dynamic field section ---
const DynamicFieldSection = ({ label, icon, fields, append, remove, placeholder, register, name, errors, required }) => (
  <div>
    <h3 className="flex items-center space-x-2 text-md font-semibold mb-3 text-[#0F172A] dark:text-[#F8FAFC]">
      {icon}<span>{label}</span>
    </h3>
    <div className="space-y-3">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <input {...register(`${name}.${index}.value`)} className="w-full bg-[#F1F5F9] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-2.5 focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60" placeholder={`${placeholder} #${index + 1}`} />
          <button type="button" onClick={() => remove(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"><Trash2 size={16} /></button>
        </div>
      ))}
    </div>
    <button type="button" onClick={append} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]">
      <PlusCircle size={18} /><span>Add {label.slice(0, -1)}</span>
    </button>
  </div>
);

const CreateProblem = () => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '', problemNo: undefined, description: '', difficulty: 'Easy',
      tags: [], companies: [], hints: [], constraints: [], starterCode: [],
      referenceSolution: [], examples: [], visibleTestCases: [], hiddenTestCases: []
    }
  });

  const tags = watch('tags');

  // Field arrays
  const { fields: constraintFields, append: appendConstraint, remove: removeConstraint } = useFieldArray({ control, name: 'constraints' });
  const { fields: companyFields, append: appendCompany, remove: removeCompany } = useFieldArray({ control, name: 'companies' });
  const { fields: hintFields, append: appendHint, remove: removeHint } = useFieldArray({ control, name: 'hints' });
  const { fields: exampleFields, append: appendExample, remove: removeExample } = useFieldArray({ control, name: 'examples' });
  const { fields: visibleTCFields, append: appendVisibleTC, remove: removeVisibleTC } = useFieldArray({ control, name: 'visibleTestCases' });
  const { fields: hiddenTCFields, append: appendHiddenTC, remove: removeHiddenTC } = useFieldArray({ control, name: 'hiddenTestCases' });
  const { fields: starterCodeFields, append: appendStarterCode, remove: removeStarterCode } = useFieldArray({ control, name: 'starterCode' });
  const { fields: refSolutionFields, append: appendRefSolution, remove: removeRefSolution } = useFieldArray({ control, name: 'referenceSolution' });

  const handleAddTag = (tag) => { if (tag && !tags.includes(tag)) setValue('tags', [...tags, tag], { shouldValidate: true }); };
  const removeTag = (tagToRemove) => setValue('tags', tags.filter(t => t !== tagToRemove), { shouldValidate: true });

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      const payload = {
        ...data,
        constraints: data.constraints?.map(c => c.value?.trim()).filter(Boolean) || [],
        companies: data.companies?.map(c => c.value?.trim()).filter(Boolean) || [],
        hints: data.hints?.map(h => h.value?.trim()).filter(Boolean) || [],
        examples: data.examples?.map(ex => ({
          input: ex.input?.trim() || "",
          output: ex.output?.trim() || "",
          explanation: ex.explanation?.trim() || ""
        })) || [],
        visibleTestCases: data.visibleTestCases?.map(tc => ({
          input: tc.input?.trim() || "",
          output: tc.output?.trim() || ""
        })) || [],
        hiddenTestCases: data.hiddenTestCases?.map(tc => ({
          input: tc.input?.trim() || "",
          output: tc.output?.trim() || ""
        })) || [],
        starterCode: data.starterCode?.map(sc => ({
          language: sc.language?.trim(),
          headerCode: sc.headerCode?.trim(),
          code: sc.code?.trim(),
          mainCode: sc.mainCode?.trim()
        })) || [],
        referenceSolution: data.referenceSolution?.map(rs => ({
          language: rs.language?.trim(),
          solutionCode: rs.solutionCode?.trim()
        })) || []
      };

      if (payload.constraints.length === 0) {
        alert('At least one constraint is required');
        return;
      }

      console.log("Final Payload:", payload);
      const response = await axiosClient.post("/problems/create", payload);
      alert('Problem created successfully!');
      navigate('/admin-portal/problems');
    } catch (e) {
      console.error("Creation Error:", e);
      const errorMsg = e.response?.data?.error || (typeof e.response?.data === 'string' ? e.response.data : e.message);
      alert('Error: ' + errorMsg);
    }
  };

  // --- Common Tailwind classes ---
  const inputBaseClasses = "w-full bg-[#F1F5F9] dark:bg-[#0F293B] border border-[#E2E8F0] dark:border-[#334155] rounded-lg p-2.5 focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]/50 outline-none transition duration-200 placeholder:text-[#64748B]/60 dark:placeholder:text-[#94A3B8]/60";
  const sectionClasses = "bg-[#FFFFFF] dark:bg-[#1E293B] p-6 rounded-xl border border-[#E2E8F0] dark:border-[#334155] shadow-sm";
  const sectionTitleClasses = "flex items-center space-x-3 text-xl font-bold border-b border-[#E2E8F0] dark:border-[#334155] pb-4 mb-6 text-[#0F172A] dark:text-[#F8FAFC]";
  const subCardClasses = "p-4 bg-[#F1F5F9] dark:bg-[#0F172A] rounded-xl border border-[#E2E8F0] dark:border-[#334155]/50 transition-all duration-300 hover:border-[#F97316]/30";
  const labelClasses = "block text-sm font-medium mb-1.5 text-[#64748B] dark:text-[#94A3B8]";
  const errorClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-10">

      {/* --- Basic Info --- */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><List size={24} className="text-[#F97316]" /><span>Basic Information</span></h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className={labelClasses}>Title</label>
              <input {...register('title', { required: 'Title is required' })} className={inputBaseClasses} placeholder="Simple Addition" />
              {errors.title && <p className={errorClasses}>{errors.title.message}</p>}
            </div>
            <div>
              <label className={labelClasses}>Problem Number</label>
              <input type="number" {...register('problemNo', { required: 'Required', valueAsNumber: true, min: 1 })} className={inputBaseClasses} placeholder="200" />
              {errors.problemNo && <p className={errorClasses}>{errors.problemNo.message}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Difficulty</label>
              <select {...register('difficulty')} className={inputBaseClasses}>
                {Object.values(ProblemDifficulty).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClasses}>Description</label>
            <textarea {...register('description', { required: 'Description is required' })} className={`${inputBaseClasses} min-h-[120px]`} placeholder="Problem description..." />
            {errors.description && <p className={errorClasses}>{errors.description.message}</p>}
          </div>
        </div>
      </div>

      {/* --- Metadata --- */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><Tag size={24} className="text-[#F97316]" /><span>Metadata</span></h2>
        <div className="space-y-6">
          <div>
            <label className={labelClasses}>Tags</label>
            <select onChange={e => { handleAddTag(e.target.value); e.target.value = ''; }} className={inputBaseClasses} defaultValue="">
              <option value="" disabled>Select a tag...</option>
              {problemTags.filter(t => !tags.includes(t)).map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
            <div className={`flex flex-wrap items-center gap-2 mt-3 p-2 rounded-lg ${inputBaseClasses} bg-[#F1F5F9] dark:bg-[#0F172A]`}>
              {tags?.length > 0 ? tags.map(tag => (
                <div key={tag} className="flex items-center gap-1.5 bg-[#F97316]/20 text-[#F97316] text-sm font-medium px-2.5 py-1 rounded-full">
                  {tag}<button type="button" onClick={() => removeTag(tag)} className="text-[#F97316] hover:bg-white/20 rounded-full p-0.5"><X size={14} /></button>
                </div>
              )) : <span className="text-sm text-[#64748B] dark:text-[#94A3B8] px-1">No tags selected.</span>}
            </div>
            {errors.tags && <p className={errorClasses}>{errors.tags.message}</p>}
          </div>

          <DynamicFieldSection label="Constraints" icon={<AlertCircle size={20} />} fields={constraintFields} append={() => appendConstraint({ value: '' })} remove={removeConstraint} placeholder="e.g., 1 <= n <= 100" register={register} name="constraints" errors={errors} required="At least one constraint required" />
          <DynamicFieldSection label="Companies" icon={<Building size={20} />} fields={companyFields} append={() => appendCompany({ value: '' })} remove={removeCompany} placeholder="e.g., Google" register={register} name="companies" errors={errors} />
          <DynamicFieldSection label="Hints" icon={<Lightbulb size={20} />} fields={hintFields} append={() => appendHint({ value: '' })} remove={removeHint} placeholder="e.g., Use addition" register={register} name="hints" errors={errors} />
        </div>
      </div>

      {/* --- Examples & Test Cases --- */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><FileJson size={24} className="text-[#F97316]" /><span>Examples & Test Cases</span></h2>
        <div className="space-y-8">
          {/* Examples */}
          <div>
            <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
              <MessageSquare size={20} /><span>Browser Examples (What users see)</span>
            </h3>
            <div className="space-y-4">
              {exampleFields.map((field, index) => (
                <div key={field.id} className={subCardClasses}>
                  <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold text-md text-[#0F172A] dark:text-[#F8FAFC]">Example #{index + 1}</p>
                    <button type="button" onClick={() => removeExample(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"><Trash2 size={16} /></button>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className={labelClasses}>Input</label><input {...register(`examples.${index}.input`)} className={inputBaseClasses} placeholder="5 10" /></div>
                      <div><label className={labelClasses}>Output</label><input {...register(`examples.${index}.output`)} className={inputBaseClasses} placeholder="15" /></div>
                    </div>
                    <div><label className={labelClasses}>Explanation</label><textarea {...register(`examples.${index}.explanation`)} className={`${inputBaseClasses} min-h-[60px]`} placeholder="Explanation..." /></div>
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => appendExample({ input: '', output: '', explanation: '' })} className="mt-3 flex items-center space-x-2 text-sm text-[#F97316] font-semibold hover:text-[#FB923C]"><PlusCircle size={18} /><span>Add Example</span></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visible Test Cases */}
            <div>
              <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                <FileJson size={20} /><span>Visible Test Cases (Judge0)</span>
              </h3>
              <div className="space-y-3">
                {visibleTCFields.map((field, index) => (
                  <div key={field.id} className={subCardClasses}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold">TC #{index + 1}</span>
                      <button type="button" onClick={() => removeVisibleTC(index)} className="text-red-500 p-1"><Trash2 size={14} /></button>
                    </div>
                    <div className="space-y-2">
                      <input {...register(`visibleTestCases.${index}.input`)} className={inputBaseClasses} placeholder="Input" />
                      <input {...register(`visibleTestCases.${index}.output`)} className={inputBaseClasses} placeholder="Output" />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => appendVisibleTC({ input: '', output: '' })} className="text-sm text-[#F97316] font-bold flex items-center gap-1"><PlusCircle size={16} />Add TC</button>
              </div>
            </div>

            {/* Hidden Test Cases */}
            <div>
              <h3 className="flex items-center space-x-2 text-md font-semibold mb-4 text-[#0F172A] dark:text-[#F8FAFC]">
                <FileJson size={20} /><span>Hidden Test Cases (Judge0)</span>
              </h3>
              <div className="space-y-3">
                {hiddenTCFields.map((field, index) => (
                  <div key={field.id} className={subCardClasses}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold">Hidden TC #{index + 1}</span>
                      <button type="button" onClick={() => removeHiddenTC(index)} className="text-red-500 p-1"><Trash2 size={14} /></button>
                    </div>
                    <div className="space-y-2">
                      <input {...register(`hiddenTestCases.${index}.input`)} className={inputBaseClasses} placeholder="Input" />
                      <input {...register(`hiddenTestCases.${index}.output`)} className={inputBaseClasses} placeholder="Output" />
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => appendHiddenTC({ input: '', output: '' })} className="text-sm text-[#F97316] font-bold flex items-center gap-1"><PlusCircle size={16} />Add Hidden TC</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Code Snippets --- */}
      <div className={sectionClasses}>
        <h2 className={sectionTitleClasses}><Code size={24} className="text-[#F97316]" /><span>Boilerplate & Solutions</span></h2>
        <div className="space-y-10">

          {/* Starter Code */}
          <div>
            <h3 className="text-lg font-bold mb-4">1. Language Boilerplate</h3>
            {starterCodeFields.map((field, index) => (
              <div key={field.id} className={subCardClasses + " mb-6"}>
                <div className="flex justify-between items-center mb-4">
                  <select {...register(`starterCode.${index}.language`)} className={`${inputBaseClasses} w-auto`}>{codeLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}</select>
                  <button type="button" onClick={() => removeStarterCode(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"><Trash2 size={16} /></button>
                </div>
                <div className="space-y-4">
                  <div><label className={labelClasses}>Header Code (Imports - Hidden from user)</label><textarea {...register(`starterCode.${index}.headerCode`)} className={`${inputBaseClasses} font-mono text-sm min-h-[60px]`} placeholder="const fs = require('fs');" /></div>
                  <div><label className={labelClasses}>Main Logic Code (Visible to user)</label><textarea {...register(`starterCode.${index}.code`)} className={`${inputBaseClasses} font-mono text-sm min-h-[120px]`} placeholder="var add = function(a, b) {\n    \n};" /></div>
                  <div><label className={labelClasses}>Driver Code (Stdin handler - Hidden from user)</label><textarea {...register(`starterCode.${index}.mainCode`)} className={`${inputBaseClasses} font-mono text-sm min-h-[80px]`} placeholder="const input = fs.readFileSync(0)... console.log(add(a,b));" /></div>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => appendStarterCode({ language: 'javascript', headerCode: '', code: '', mainCode: '' })} className="text-[#F97316] font-bold flex items-center gap-2"><PlusCircle size={20} />Add Boilerplate</button>
          </div>

          <hr className="border-[#E2E8F0] dark:border-[#334155]" />

          {/* Reference Solution */}
          <div>
            <h3 className="text-lg font-bold mb-4">2. Reference Solutions (Verified by Judge0)</h3>
            {refSolutionFields.map((field, index) => (
              <div key={field.id} className={subCardClasses + " mb-6"}>
                <div className="flex justify-between items-center mb-4">
                  <select {...register(`referenceSolution.${index}.language`)} className={`${inputBaseClasses} w-auto`}>{codeLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}</select>
                  <button type="button" onClick={() => removeRefSolution(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-full"><Trash2 size={16} /></button>
                </div>
                <div>
                  <label className={labelClasses}>Full Working Solution Code</label>
                  <textarea {...register(`referenceSolution.${index}.solutionCode`)} className={`${inputBaseClasses} font-mono text-sm min-h-[150px]`} placeholder="var add = function(a, b) { return a + b; };" />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => appendRefSolution({ language: 'javascript', solutionCode: '' })} className="text-[#F97316] font-bold flex items-center gap-2"><PlusCircle size={20} />Add Reference Solution</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end p-4">
        <button type="submit" className="bg-[#F97316] hover:bg-[#FB923C] text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 text-lg transform active:scale-95"><ArrowRight size={20} />Create Problem</button>
      </div>
    </form>
  );
};

export default CreateProblem;
