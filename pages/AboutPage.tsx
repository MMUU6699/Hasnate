import React from 'react';

const AboutPage: React.FC = () => {
    const projects = [
        {
            name: 'Postyy',
            url: 'https://postyy.netlify.app/',
            description: 'منصة عصرية لمشاركة المنشورات والأفكار.'
        },
        {
            name: 'Index',
            url: 'https://index-git-master-voxinappindexcom.vercel.app/',
            description: 'محرك بحث ومؤشر للمحتوى على الإنترنت.'
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-teal-700 dark:text-teal-400">Voxin</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-3">
                    شركة ناشئة تأسست عام 2021، متخصصة في تطوير تطبيقات الويب والجوال المبتكرة.
                </p>
                <a 
                    href="https://voxin.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 inline-block bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 dark:hover:bg-teal-500 transition-transform transform hover:scale-105 duration-300 shadow-lg"
                >
                    زيارة موقعنا
                    <i className="ph-fill ph-arrow-up-right ml-2"></i>
                </a>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-teal-800 dark:text-teal-300 mb-6 text-center">من مشاريعنا</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <a 
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-start group"
                        >
                            <h3 className="text-2xl font-bold text-teal-700 dark:text-teal-400">{project.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4 flex-grow">{project.description}</p>
                            <div className="text-teal-600 dark:text-teal-400 font-semibold flex items-center transition-transform duration-300 group-hover:translate-x-1">
                                <span>اكتشف المشروع</span>
                                <i className="ph-fill ph-arrow-left mr-2"></i>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AboutPage;
