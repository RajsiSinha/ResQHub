import { createContext, useContext, useState, useEffect } from "react";

const IncidentContext = createContext();

export function IncidentProvider({ children }) {

  // 🔥 LOAD FROM LOCALSTORAGE ON START
  const [incidents, setIncidents] = useState(() => {
  return JSON.parse(localStorage.getItem("incidents")) || [];
});


  // 🔥 AUTO SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("incidents", JSON.stringify(incidents));
  }, [incidents]);

  // 🟢 ADD INCIDENT
  const addIncident = (incident) => {
    setIncidents((prev) => [
      ...prev,
      {
        ...incident,
        id: `INC-${Date.now()}`,
        status: "PENDING",
        assignedTo: null,
        createdAt: new Date(),
      },
    ]);
  };

  // 🟡 UPDATE STATUS (ASSIGN / RESOLVE)
  const updateStatus = (id, newStatus, responderName = null) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: newStatus,
              assignedTo:
                newStatus === "ASSIGNED"
                  ? responderName
                  : inc.assignedTo,
            }
          : inc
      )
    );
  };

  // 🔴 REMOVE INCIDENT
  const removeIncident = (id) => {
    setIncidents((prev) =>
      prev.filter((inc) => inc.id !== id)
    );
  };

  // 🔁 OFFLINE SYNC
  useEffect(() => {

    const handleOnline = () => {
      const offlineIncidents =
        JSON.parse(localStorage.getItem("offlineIncidents")) || [];

      if (offlineIncidents.length === 0) return;

      setIncidents((prev) => [
        ...prev,
        ...offlineIncidents.map((incident) => ({
          ...incident,
          id: `INC-${Date.now()}`,
          status: "PENDING",
          assignedTo: null,
          synced: true,
          createdAt: new Date(),
        })),
      ]);

      localStorage.removeItem("offlineIncidents");

      alert("✅ Connection restored. Offline incidents synced globally.");
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };

  }, []);

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        addIncident,
        updateStatus,
        removeIncident,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
}

export function useIncidents() {
  return useContext(IncidentContext);
}
