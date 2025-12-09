"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, X, Save, Loader2, Briefcase } from "lucide-react";

interface Achievement {
  title: string;
  description: string;
  impact: string;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  period: string;
  description: string;
  achievements: Achievement[];
  technologies: string[];
  highlights: string[];
  order: number;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    period: "",
    description: "",
    achievements: [],
    technologies: [],
    highlights: [],
    order: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Temporary inputs
  const [techInput, setTechInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [achievementInput, setAchievementInput] = useState({
    title: "",
    description: "",
    impact: "",
  });

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch("/api/experiences");
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData(exp);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingExp(null);
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      period: "",
      description: "",
      achievements: [],
      technologies: [],
      highlights: [],
      order: 0,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const url = editingExp
        ? `/api/experiences/${editingExp.id}`
        : "/api/experiences";
      const method = editingExp ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchExperiences();
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/experiences/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchExperiences();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...(formData.highlights || []), highlightInput.trim()],
      });
      setHighlightInput("");
    }
  };

  const addAchievement = () => {
    if (
      achievementInput.title &&
      achievementInput.description &&
      achievementInput.impact
    ) {
      setFormData({
        ...formData,
        achievements: [...(formData.achievements || []), achievementInput],
      });
      setAchievementInput({ title: "", description: "", impact: "" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-800" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Experience</h1>
          <p className="text-gray-600">
            Manage work history - {experiences.length} total
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {/* Experience Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-2">
                    {exp.company} • {exp.location}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {exp.type}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 6).map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 6 && (
                      <span className="text-xs text-gray-500">
                        +{exp.technologies.length - 6}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(exp.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="bg-gray-800 text-white px-6 py-4 flex justify-between">
                <h2 className="text-xl font-bold">
                  {editingExp ? "Edit" : "Add"} Experience
                </h2>
                <button onClick={() => setShowModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Period *
                    </label>
                    <input
                      type="text"
                      value={formData.period}
                      onChange={(e) =>
                        setFormData({ ...formData, period: e.target.value })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="2022 - Present"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Technologies
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addTechnology())
                      }
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                      onClick={addTechnology}
                      className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2"
                      >
                        {tech}
                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              technologies: formData.technologies?.filter(
                                (_, idx) => idx !== i
                              ),
                            })
                          }
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Highlights
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addHighlight())
                      }
                      className="flex-1 px-4 py-2 border rounded-lg"
                    />
                    <button
                      onClick={addHighlight}
                      className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.highlights?.map((h, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-2"
                      >
                        {h}
                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              highlights: formData.highlights?.filter(
                                (_, idx) => idx !== i
                              ),
                            })
                          }
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Achievements
                  </label>
                  <div className="space-y-2 mb-2">
                    <input
                      type="text"
                      value={achievementInput.title}
                      onChange={(e) =>
                        setAchievementInput({
                          ...achievementInput,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Achievement title"
                    />
                    <input
                      type="text"
                      value={achievementInput.description}
                      onChange={(e) =>
                        setAchievementInput({
                          ...achievementInput,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={achievementInput.impact}
                      onChange={(e) =>
                        setAchievementInput({
                          ...achievementInput,
                          impact: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Impact"
                    />
                    <button
                      onClick={addAchievement}
                      className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
                    >
                      Add Achievement
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.achievements?.map((ach, i) => (
                      <div key={i} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-semibold">{ach.title}</p>
                            <p className="text-sm">{ach.description}</p>
                            <p className="text-sm text-green-600">
                              {ach.impact}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              setFormData({
                                ...formData,
                                achievements: formData.achievements?.filter(
                                  (_, idx) => idx !== i
                                ),
                              })
                            }
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border-2 border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-md"
            >
              <h3 className="text-xl font-bold mb-2">Delete Experience?</h3>
              <p className="text-gray-600 mb-6">This cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 border-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


