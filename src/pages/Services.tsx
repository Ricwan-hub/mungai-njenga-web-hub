
import { Suspense, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

const services = [
  {
    id: 1,
    title: "Corporate Governance and Compliance",
    items: [
      "Drafting and reviewing company policies and charters",
      "Ensuring compliance with the Companies Act, 2015",
      "Advising on corporate governance best practices",
      "Assisting in compliance with sector-specific regulations"
    ]
  },
  {
    id: 2,
    title: "Contract Law",
    items: [
      "Drafting, reviewing, and negotiating contracts",
      "Advising on breach of contract issues",
      "Enforcing contractual obligations and remedies"
    ]
  },
  {
    id: 3,
    title: "Intellectual Property (IP) Law",
    items: [
      "Trademark registration and enforcement",
      "Copyright protection and licensing",
      "Patent filing and infringement litigation"
    ]
  },
  {
    id: 4,
    title: "Employment and Labour Law",
    items: [
      "Drafting employment contracts",
      "Advising on employee rights and employer obligations",
      "Handling disputes with unions or employees",
      "Compliance with labor laws and employment standards"
    ]
  },
  {
    id: 5,
    title: "Tax Law",
    items: [
      "Tax planning and advisory",
      "Representation in tax disputes with the Kenya Revenue Authority (KRA)",
      "Advising on VAT, corporate tax, and PAYE compliance"
    ]
  },
  {
    id: 6,
    title: "Litigation and Dispute Resolution",
    items: [
      "Representation in court and arbitration proceedings",
      "Advising on alternative dispute resolution mechanisms",
      "Handling commercial, civil, and criminal litigation cases"
    ]
  },
  {
    id: 7,
    title: "Real Estate and Property Law",
    items: [
      "Advising on land purchases and leases",
      "Drafting conveyancing agreements",
      "Handling disputes over land ownership and titles"
    ]
  },
  {
    id: 8,
    title: "Mergers, Acquisitions, and Joint Ventures",
    items: [
      "Due diligence investigations",
      "Drafting and reviewing agreements",
      "Advising on regulatory compliance for mergers and acquisitions"
    ]
  },
  {
    id: 9,
    title: "Banking and Finance Law",
    items: [
      "Drafting loan agreements",
      "Advising on debt recovery and foreclosure processes",
      "Compliance with the Central Bank of Kenya (CBK) regulations"
    ]
  },
  {
    id: 10,
    title: "Insurance Law",
    items: [
      "Drafting and reviewing insurance policies",
      "Representing clients in claims disputes",
      "Advising on compliance with the Insurance Regulatory Authority (IRA)"
    ]
  },
  {
    id: 11,
    title: "Regulatory Approvals and Licensing",
    items: [
      "Assisting with obtaining operational licenses and permits",
      "Advising on compliance with industry-specific regulations"
    ]
  },
  {
    id: 12,
    title: "Cybersecurity and Data Protection Law",
    items: [
      "Advising on compliance with the Data Protection Act, 2019",
      "Drafting data privacy policies",
      "Handling cases of cybercrime and data breaches"
    ]
  },
  {
    id: 13,
    title: "Environmental and Energy Law",
    items: [
      "Advising on compliance with environmental regulations",
      "Drafting environmental impact assessment (EIA) reports",
      "Handling disputes related to natural resource management"
    ]
  },
  {
    id: 14,
    title: "Immigration Law",
    items: [
      "Assisting with work permits and residency applications",
      "Advising on compliance with Kenyan immigration laws"
    ]
  },
  {
    id: 15,
    title: "Family and Succession Law",
    items: [
      "Drafting wills and managing estate planning",
      "Handling probate and succession disputes",
      "Advising on family law matters like divorce and child custody"
    ]
  },
  {
    id: 16,
    title: "NGO and Charity Law",
    items: [
      "Assisting with NGO registration and compliance",
      "Advising on governance and funding agreements"
    ]
  },
  {
    id: 17,
    title: "Technology Law",
    items: [
      "Advising on e-commerce regulations",
      "Drafting technology licensing agreements",
      "Handling disputes over software and technology use"
    ]
  },
  {
    id: 18,
    title: "Entertainment and Media Law",
    items: [
      "Drafting contracts for artists, producers, and creators",
      "Advising on copyright issues in media production",
      "Representing clients in disputes over royalties and broadcasting rights"
    ]
  }
];

const ServicesPage = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <MainLayout>
      <div className="pt-24 md:pt-28 lg:pt-32">
        <section className="section bg-muted/30">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16" ref={sectionRef}>
              <Badge variant="outline" className="mb-4">
                Our Services
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                Detailed Service Portfolio
              </h1>
              <p className="text-muted-foreground">
                Mungai & Njenga Company Advocates provides a comprehensive range of legal services
                tailored to meet the diverse needs of our clients across various sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="border-none shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-2">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16">
              <Separator className="mb-8" />
              
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-4">Commitment to Clients</h2>
                <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Mungai & Njenga is committed to delivering value through:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-3xl mx-auto">
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Tailored Solutions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Understanding each client's unique needs to provide customized legal strategies that align with their business objectives.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Proactive Communication</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Maintaining open lines of communication to keep clients informed throughout the legal process.
                      </CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Timeliness</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Ensuring that all services are delivered promptly to meet client deadlines.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
                
                <ButtonCustom asChild>
                  <Link to="/#contact">Contact Us For Legal Assistance</Link>
                </ButtonCustom>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ServicesPage;
