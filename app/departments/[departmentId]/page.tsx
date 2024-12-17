import React from "react";
import DepartmentDetail from "@/modules/departmentModules/departmentDetails";

export default function DepartmentDetailsPage({ params }: { params: Promise<{ departmentId: string }> }) {
    const { departmentId } = React.use(params);

    return (
        <div>
            <DepartmentDetail departmentId={departmentId} />
        </div>
    );
}
