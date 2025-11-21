import React, { useEffect, useState } from "react";

interface Resource {
  [key: string]: any;
}

interface Account {
  account: string;
  resources: {
    ec2?: Resource[] | string;
    rds?: Resource[] | string;
    eks?: Resource[] | string;
    asg?: Resource[] | string;
    vpc?: Resource[] | string;
    s3?: Resource[] | string;
  };
}

interface DashboardData {
  accounts: Account[];
}

const Dashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("all");
  const [resources, setResources] = useState<Record<string, Resource[]>>({
    ec2: [],
    rds: [],
    eks: [],
    asg: [],
    vpc: [],
    s3: [],
  });

  // 🔹 Logout function
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    window.location.href = "/";
  };

  // 🔹 Fetch accounts
  const populateAccountDropdown = async () => {
    try {
      const res = await fetch("/api/accounts", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      });
      const data = await res.json();
      setAccounts(["all", ...data.accounts]);
    } catch {
      setAccounts(["all", "Production"]);
    }
  };

  // 🔹 Fetch dashboard data
  const loadData = async () => {
    const token = sessionStorage.getItem("token");
    const url =
      selectedAccount === "all"
        ? "/api/dashboard"
        : `/api/dashboard?account=${selectedAccount}`;

    const res = await fetch(url, {
      headers: { Authorization: "Bearer " + token },
    });
    const data: DashboardData = await res.json();

    const collected: Record<string, Resource[]> = {
      ec2: [],
      rds: [],
      eks: [],
      asg: [],
      vpc: [],
      s3: [],
    };

    // ✅ Fixed: use account.resources[type]
    data.accounts.forEach((account) => {
      Object.keys(collected).forEach((type) => {
        const value = account.resources[type as keyof typeof account.resources];
        if (Array.isArray(value)) {
          collected[type] = collected[type].concat(value);
        } else if (typeof value === "string") {
          console.error(`Error in ${account.account} ${type}:`, value);
        }
      });
    });

    console.log("Collected resources:", collected); // 🔍 Debug log
    setResources(collected);

    // Show refresh in tab
    document.title = `AWS Dashboard - Last refresh: ${new Date().toLocaleTimeString()}`;
  };

  // 🔹 On mount: check auth, load accounts, load data
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      window.location.href = "/";
    }
    populateAccountDropdown();
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount]);

  // 🔹 Render table
  const renderTable = (type: string, items: Resource[]) => {
    if (items.length === 0) {
      return (
        <div className="no-resources">No resources found in this category</div>
      );
    }

    const headers = Object.keys(items[0]);

    return (
      <table>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key}>
                {key === "running_time"
                  ? "UPTIME"
                  : key.replace("_", " ").toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, id) => (
            <tr key={id}>
              {headers.map((key) => {
                const val = item[key];
                if (key === "status" || key === "state") {
                  return (
                    <td key={key}>
                      <span
                        className={
                          val === "active" ||
                          val === "running" ||
                          val === "ACTIVE" ||
                          val === "available"
                            ? "active"
                            : val === "inactive" || val === "stopped"
                            ? "inactive"
                            : ""
                        }
                      >
                        {val}
                      </span>
                    </td>
                  );
                } else if (key === "running_time") {
                  return (
                    <td
                      key={key}
                      style={{
                        fontWeight: "bold",
                        color: val.includes("h") ? "#28a745" : "#6c757d",
                      }}
                    >
                      {val}
                    </td>
                  );
                } else {
                  return <td key={key}>{val}</td>;
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <header>
        <h2>AWS Dashboard</h2>
        <button onClick={logout}>Logout</button>

        <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
        >
          {accounts.map((acc) => (
            <option key={acc} value={acc}>
              {acc}
            </option>
          ))}
        </select>
      </header>

      <section>
        <h3>EC2 Instances ({resources.ec2.length})</h3>
        {renderTable("ec2", resources.ec2)}

        <h3>RDS Instances ({resources.rds.length})</h3>
        {renderTable("rds", resources.rds)}

        <h3>EKS Clusters ({resources.eks.length})</h3>
        {renderTable("eks", resources.eks)}

        <h3>ASG Groups ({resources.asg.length})</h3>
        {renderTable("asg", resources.asg)}

        <h3>VPCs ({resources.vpc.length})</h3>
        {renderTable("vpc", resources.vpc)}

        <h3>S3 Buckets ({resources.s3.length})</h3>
        {renderTable("s3", resources.s3)}
      </section>
    </div>
  );
};

export default Dashboard;
