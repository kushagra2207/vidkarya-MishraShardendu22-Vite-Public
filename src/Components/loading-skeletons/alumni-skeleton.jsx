import React from "react";
import "./loading-skeleton.css";

export default function AlumniSkeleton() {
    return (
        <>
            <div className="flex items-center justify-center my-10">
                <div className="w-3/4 h-10 skeleton md:w-1/2"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-5 max-w-[1600px] mx-auto">
                <AlumniProfileSkeleton />
                <AlumniProfileSkeleton />
                <AlumniProfileSkeleton />
                <AlumniProfileSkeleton />
                <AlumniProfileSkeleton />
                <AlumniProfileSkeleton />
                <AlumniProfileSkeleton />
                <AlumniProfileSkeleton />
            </div>
        </>
    );
}

const AlumniProfileSkeleton = () => {
    return (
        <div className="profile-card skeleton-card">
            <div className="card-header">
                <div className="avatar skeleton w-[5rem] h-[5rem] rounded-full"></div>
                <div className="card-title">
                    <div className="skeleton w-[60%] h-[1.5rem] mb-2"></div>
                    <div className="skeleton w-[40%] h-[1rem]"></div>
                </div>
            </div>
            <div className="domain-badge skeleton w-[30%] h-[2rem] rounded-lg"></div>
            <div className="card-body">
                <div className="skeleton w-[80%] h-[1rem] my-2"></div>
                <div className="skeleton w-[90%] h-[1rem] my-2"></div>
                <div className="skeleton w-[70%] h-[1rem] my-2"></div>
            </div>
            <div className="card-footer">
                <div className="skeleton w-[2.5rem] h-[2.5rem] rounded-full"></div>
                <div className="skeleton w-[2.5rem] h-[2.5rem] rounded-full"></div>
                <div className="skeleton w-[2.5rem] h-[2.5rem] rounded-full"></div>
                <div className="skeleton w-[2.5rem] h-[2.5rem] rounded-full"></div>
                <div className="skeleton w-[2.5rem] h-[2.5rem] rounded-full"></div>
                <div className="skeleton w-[2.5rem] h-[2.5rem] rounded-full"></div>
            </div>
        </div>
    );
}