// ... baaki imports wahi rahenge

export default function Ideas() {
  const [ideas, setIdeas] = useState([]); // Default empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('');

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      // FIX 1: Pura path likhein (/api/ideas)
      const res = await axios.get('https://idea-connect-backend.onrender.com/api/ideas');
      
      // FIX 2: Check karein ki data array hai ya nahi
      if (Array.isArray(res.data)) {
        setIdeas(res.data);
      } else {
        setIdeas([]); // Agar data array nahi hai toh empty array set karein
        console.error("Backend returned non-array data:", res.data);
      }
      setError(null);
    } catch (err) {
      setError('Failed to load ideas. Is the backend running?');
      setIdeas([]); // Error aane par bhi array hi rakhein
    } finally {
      setLoading(false);
    }
  };

  // FIX 3: Safe Filter (Optional chaining use karein)
  const filteredIdeas = (Array.isArray(ideas) ? ideas : []).filter(idea => {
    if (!idea) return false;
    
    const matchesSearch = (idea.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
                          (idea.details?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                          (idea.rolesNeeded?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    
    const matchesStage = stageFilter ? idea.stage === stageFilter : true;
    return matchesSearch && matchesStage;
  });

  return (
    // ... baaki JSX wahi rahega
    // Grid ke andar map hamesha filteredIdeas par karein
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
      {filteredIdeas.map(idea => (
        <IdeaCard key={idea._id} idea={idea} />
      ))}
    </div>
    // ...
  );
}
