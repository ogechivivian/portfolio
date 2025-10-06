// Project data configuration
export const projects = [
  {
    id: 1,
    title: "Kubernetes Cluster Monitoring",
    description: "Comprehensive Kubernetes cluster monitoring dashboard using Grafana. Real-time monitoring of node health, pod status, resource utilization, and container performance metrics.",
    technologies: ["Kubernetes", "Grafana", "Prometheus", "Docker", "Monitoring"],
    image: "./assets/images/projects/kubernetes-monitoring-dashboard.png",
    githubUrl: "#",
    liveUrl: "#",
    metrics: {
      nodes: "6 Active Nodes",
      pods: "270+ Running Pods", 
      uptime: "100% Node Ready"
    }
  },
  {
    id: 2,
    title: "CI/CD Pipeline Automation",
    description: "Advanced CI/CD pipeline implementation with automated build, test, deploy, and artifact management. Includes Docker containerization, secret management, and Artifactory integration.",
    technologies: ["Jenkins", "Docker", "Artifactory", "Build Automation", "DevOps"],
    image: "./assets/images/projects/cicd-pipeline-dashboard.png",
    githubUrl: "#",
    liveUrl: "#",
    metrics: {
      stages: "15+ Pipeline Stages",
      automation: "Fully Automated",
      runtime: "2m 5s Build Time"
    }
  }
];