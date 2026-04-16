import { Globe } from "lucide-react";

const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "json", label: "JSON" },
    { value: "sql", label: "SQL" },
    { value: "markdown", label: "Markdown" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "csharp", label: "C#" }
];

const LanguageSelector = ({ selected, onChange }) => {
    return (
        <div className="flex items-center gap-2 bg-[#0d1117] border border-[#30363d] px-3 py-1.5 rounded-lg focus-within:border-pink-500/50 transition-colors">
            <Globe className="w-4 h-4 text-gray-500" />
            <select 
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="bg-transparent text-sm font-medium text-white outline-none cursor-pointer appearance-none pr-6 relative"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center'
                }}
            >
                {languages.map((lang) => (
                    <option key={lang.value} value={lang.value} className="bg-[#161b22] text-white">
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
