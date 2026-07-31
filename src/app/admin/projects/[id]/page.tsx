"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/app/admin/Sidebar";
import { ArrowLeft, ExternalLink, Code2, Trash2 } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  live_url: string | null;
  github_url: string | null;
  technologies: string;
  key_features: string;
  image_url: string | null;
  image_urls: string[];
  created_at: string;
};

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        setError("Project not found");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setProject(data);
    } catch (err) {
      console.error("Failed to fetch project:", err);
      setError("Failed to load project");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Delete this project? This cannot be undone.")) return;

    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/admin/projects");
      } else {
        alert("Failed to delete project");
        setDeleting(false);
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
      alert("Failed to delete project");
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>

      <main className="lg:ml-[250px] pt-[100px] lg:pt-8 min-h-screen px-4 sm:px-6 lg:px-8 xl:px-10 pb-10">
        <div className="max-w-[900px] mx-auto">
          {/* BACK */}
          <button
            onClick={() => router.push("/admin/projects")}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition mb-6"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>

          {loading ? (
            <div className="text-white/40 text-sm">Loading project...</div>
          ) : error ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/40">
              {error}
            </div>
          ) : project ? (
            <div className="space-y-6">
              {/* IMAGE */}
              {project.image_url && (
                <div className="w-full h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
                  <img
                    src={project.image_url}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* EXTRA IMAGES */}
              {project.image_urls && project.image_urls.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {project.image_urls.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="h-[90px] rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]"
                    >
                      <img src={img} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              {/* HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {project.title}
                  </h1>
                  <p className="text-xs text-white/30 mt-2">
                    Added{" "}
                    {project.created_at
                      ? new Date(project.created_at).toLocaleDateString()
                      : "unknown date"}
                  </p>
                </div>

                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/10 text-red-300 hover:bg-red-500/20 transition text-sm disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>

              {/* LINKS */}
              <div className="flex flex-wrap gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition text-sm"
                  >
                    <ExternalLink size={14} />
                    Live Site
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition text-sm"
                  >
                    <Code2 size={14} />
                    GitHub
                  </a>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <h2 className="text-sm font-medium text-white/50 mb-3">
                  Description
                </h2>
                <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                  {project.description}
                </p>
              </div>

              {/* TECHNOLOGIES */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <h2 className="text-sm font-medium text-white/50 mb-3">
                  Technologies
                </h2>
                <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                  {project.technologies}
                </p>
              </div>

              {/* FEATURES */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                <h2 className="text-sm font-medium text-white/50 mb-3">
                  Key Features
                </h2>
                <p className="text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                  {project.key_features}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
