"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Phone, Instagram, X, MessageCircle, Menu, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detectar scroll para efeitos na navegação
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <Link href="#home" className="flex items-center gap-2" aria-label="Ir para o início">
            <Image
              src="/images/logo-simples.png"
              alt="Logo Dra. Karla Saraiva - Ginecologista e Obstetra"
              width={40}
              height={40}
              className="h-7 w-auto sm:h-8 md:h-10"
              priority
            />
            <span className="text-base sm:text-lg md:text-xl font-bold text-[#8a7267]">Dra. Karla Saraiva</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6" role="navigation" aria-label="Menu principal">
            <Link href="#home" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
              Especialidades
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
              Depoimentos
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          <Button asChild className="hidden md:inline-flex bg-[#c0a080] hover:bg-[#a88c6a] text-sm">
            <a
              href="https://wa.me/5511962094662?text=Olá! Gostaria de agendar uma consulta com a Dra. Karla Saraiva."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar consulta com Dra. Karla Saraiva via WhatsApp"
            >
              Agende sua Consulta
            </a>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden bg-transparent border-0 h-10 w-10"
            onClick={toggleMobileMenu}
            aria-label="Abrir menu de navegação"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container px-3 py-3 space-y-2" role="navigation" aria-label="Menu mobile">
              <Link
                href="#home"
                className="block text-base font-medium hover:text-primary transition-colors py-2.5 px-2 rounded hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="block text-base font-medium hover:text-primary transition-colors py-2.5 px-2 rounded hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                Sobre
              </Link>
              <Link
                href="#services"
                className="block text-base font-medium hover:text-primary transition-colors py-2.5 px-2 rounded hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                Especialidades
              </Link>
              <Link
                href="#testimonials"
                className="block text-base font-medium hover:text-primary transition-colors py-2.5 px-2 rounded hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                Depoimentos
              </Link>
              <Link
                href="#contact"
                className="block text-base font-medium hover:text-primary transition-colors py-2.5 px-2 rounded hover:bg-gray-50"
                onClick={closeMobileMenu}
              >
                Contato
              </Link>
              <div className="pt-2">
                <Button asChild className="w-full bg-[#c0a080] hover:bg-[#a88c6a] h-11">
                  <a
                    href="https://wa.me/5511962094662?text=Olá! Gostaria de agendar uma consulta com a Dra. Karla Saraiva."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    aria-label="Agendar consulta via WhatsApp"
                  >
                    Agende sua Consulta
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="relative py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="absolute inset-0 bg-white z-0 flex items-center justify-center">
            <Image
              src="/images/logo-simples.png"
              alt=""
              width={800}
              height={800}
              className="opacity-5 object-contain"
              aria-hidden="true"
              priority
            />
          </div>
          <div className="container relative z-10 px-3 sm:px-4">
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-12">
              <div className="flex-1 space-y-3 sm:space-y-4 text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#8a7267] leading-tight">
                  Dra. Karla Saraiva
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
                  Ginecologista e Obstetra em São Paulo
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground font-medium">CRM 208027 | RQE 127957</p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[600px] mx-auto lg:mx-0 leading-relaxed">
                  Para cada fase da sua saúde feminina, eu ofereço um cuidado especial. Meu objetivo é proporcionar um
                  acompanhamento acolhedor e personalizado, desde a rotina ginecológica até o pré-natal, parto e
                  pós-parto. Estou aqui para garantir respeito, segurança, dedicação e bem-estar em cada etapa da sua
                  vida.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 sm:pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#c0a080] hover:bg-[#a88c6a] w-full sm:w-auto h-11 sm:h-12 text-base"
                  >
                    <a
                      href="https://wa.me/5511962094662?text=Olá! Gostaria de agendar uma consulta com a Dra. Karla Saraiva."
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Agendar consulta com Dra. Karla Saraiva via WhatsApp"
                    >
                      Agende sua Consulta
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-start w-full mt-4 lg:mt-0">
                <Image
                  src="/images/dra-karla-hero.jpg"
                  alt="Dra. Karla Saraiva - Médica Ginecologista e Obstetra especializada em saúde da mulher, pré-natal e parto humanizado em São Paulo"
                  width={500}
                  height={600}
                  className="rounded-lg shadow-xl object-cover w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md"
                  priority
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#f9f7f5]">
          <div className="container px-3 sm:px-4">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12">
              <div className="flex-1 flex justify-center w-full order-2 lg:order-1">
                <Image
                  src="/images/dra-karla-about.jpg"
                  alt="Dra. Karla Saraiva em seu consultório na Lalutie Clinic - Especialista em Obstetrícia, Ginecologia e Medicina Fetal em São Paulo"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-xl object-cover w-full max-w-[320px] sm:max-w-sm md:max-w-md"
                  loading="lazy"
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
                />
              </div>
              <div className="flex-1 space-y-3 sm:space-y-4 order-1 lg:order-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8a7267] text-center lg:text-left">
                  Sobre Mim
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-center lg:text-left leading-relaxed">
                  Sou uma médica apaixonada por cuidar da saúde feminina de forma humanizada e completa. Com uma
                  formação sólida e ampla experiência, me dedico a oferecer um atendimento acolhedor e personalizado,
                  valorizando a individualidade de cada paciente.
                </p>
                <div className="pt-2 sm:pt-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-[#8a7267] text-center lg:text-left">
                    Formação e Experiência
                  </h3>
                  <ul className="space-y-2 sm:space-y-3" role="list">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#c0a080] mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-sm sm:text-base md:text-lg">Graduada em Medicina pela UNICAMP</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#c0a080] mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-sm sm:text-base md:text-lg">
                        Residência em Obstetrícia e Ginecologia pelo Hospital das Clínicas da USP/SP
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#c0a080] mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-sm sm:text-base md:text-lg">
                        Especialização em Medicina Fetal (Ultrassonografia) pela USP/SP
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2 sm:pt-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-[#8a7267] text-center lg:text-left">
                    Diferenciais do Atendimento
                  </h3>
                  <ul className="space-y-2 sm:space-y-3" role="list">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#c0a080] mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-sm sm:text-base md:text-lg">
                        Cuidado integral, considerando os aspectos físico, emocional e social
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#c0a080] mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-sm sm:text-base md:text-lg">
                        Acompanhamento dedicado de gestações de alto e baixo risco
                      </span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#c0a080] mt-2 flex-shrink-0" aria-hidden="true"></div>
                      <span className="text-sm sm:text-base md:text-lg">
                        Foco em um pré-natal e parto seguros, com atenção total à mãe e ao bebê
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground pt-2 sm:pt-4 text-center lg:text-left leading-relaxed">
                  Eu acredito que cada paciente merece um cuidado especial e estarei ao seu lado em todas as etapas
                  dessa jornada, garantindo saúde, segurança e bem-estar.
                </p>
                <div className="flex justify-center lg:justify-start pt-4 sm:pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="bg-[#c0a080] hover:bg-[#a88c6a] w-full sm:w-auto h-11 sm:h-12 text-base"
                  >
                    <a
                      href="https://wa.me/5511962094662?text=Olá! Gostaria de agendar uma consulta com a Dra. Karla Saraiva."
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Agendar consulta com Dra. Karla Saraiva via WhatsApp"
                    >
                      Agende sua Consulta
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container px-3 sm:px-4">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8a7267] mb-3 sm:mb-4 px-2">
                Cuidado Personalizado em Obstetrícia e Ginecologia
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
                Dedicação e cuidado em todas as etapas da sua vida: desde a rotina ginecológica e tratamentos
                especializados até o pré-natal, parto, pós-parto e planejamento gestacional sempre com acolhimento e
                excelência.
              </p>
            </div>

            {/* Grid de Serviços - Responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {services.slice(0, 4).map((service, index) => (
                <article
                  key={index}
                  className="bg-[#f9f7f5] p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div
                    className="h-11 w-11 sm:h-12 sm:w-12 bg-[#c0a080]/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-[#8a7267]">{service.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>

            {/* Segunda linha centrada */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-4xl w-full">
                {services.slice(4).map((service, index) => (
                  <article
                    key={index + 4}
                    className="bg-[#f9f7f5] p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center"
                  >
                    <div
                      className="h-11 w-11 sm:h-12 sm:w-12 bg-[#c0a080]/20 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-[#8a7267]">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="flex justify-center pt-6 sm:pt-8">
              <Button
                asChild
                size="lg"
                className="bg-[#c0a080] hover:bg-[#a88c6a] w-full sm:w-auto h-11 sm:h-12 text-base max-w-md"
              >
                <a
                  href="https://wa.me/5511962094662?text=Olá! Gostaria de agendar uma consulta com a Dra. Karla Saraiva."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar consulta com Dra. Karla Saraiva via WhatsApp"
                >
                  Agende sua Consulta
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#f9f7f5]">
          <div className="container px-3 sm:px-4">
            <div className="text-center mb-4 sm:mb-5 md:mb-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8a7267] mb-2 sm:mb-3">Depoimentos</h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                O que nossas pacientes dizem sobre o atendimento
              </p>
            </div>
            <iframe
              srcDoc='<!DOCTYPE html><html><head><style>body{margin:0;padding:0;font-family:system-ui,-apple-system,sans-serif;}</style></head><body><div id="reviews-widget-522"></div><script src="https://app.reviewconnect.me/embed/uR6N66EjRJkccct4pfn5c8gUV7R18XwS/widget.js" async></script></body></html>'
              className="w-full min-h-[300px] sm:min-h-[350px] md:min-h-[400px] border-0"
              title="Avaliações de pacientes da Dra. Karla Saraiva no Google"
              loading="lazy"
            />

            {/* Botão de Avaliação */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <Button
                asChild
                size="lg"
                className="bg-[#c0a080] hover:bg-[#a88c6a] hover:scale-105 transition-all duration-300 w-full sm:w-auto max-w-md group h-11 sm:h-12 text-base"
              >
                <a
                  href="https://g.page/r/CYZRVdO-RniwEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Deixar uma avaliação sobre Dra. Karla Saraiva no Google"
                  className="flex items-center justify-center gap-2"
                >
                  <Star className="h-5 w-5 group-hover:fill-current transition-all duration-300" />
                  Deixe uma Avaliação
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
          <div className="container px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8a7267] mb-2 sm:mb-3">
                Conheça a Lalutie Clinic
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2">
                Clínica planejada para atender as pacientes com todo conforto e individualidade que elas merecem.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7!2d-46.6632!3d-23.5712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa949%3A0xc7a12804c6b7c1c1!2sRua%20Bento%20de%20Andrade%2C%20278%20-%20Jardim%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Lalutie Clinic - Rua Bento de Andrade, 278, Jardim Paulista, São Paulo, SP - Consultório da Dra. Karla Saraiva"
                ></iframe>
              </div>
              <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/clinica-lalutie.jpg"
                  alt="Interior da Lalutie Clinic - Recepção moderna com área de espera confortável, ambiente acolhedor para consultas ginecológicas, obstétricas e ultrassonografia em São Paulo"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#f9f7f5]">
          <div className="container px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8a7267] mb-2 sm:mb-3">
                Perguntas Frequentes
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Tire suas dúvidas sobre consultas e procedimentos
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <article
                  key={index}
                  className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#8a7267] mb-2">{faq.question}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#8a7267] text-white py-6 sm:py-8">
        <div className="container px-3 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start md:items-center">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Image
                src="/images/logo-simples.png"
                alt="Logo Dra. Karla Saraiva - Ginecologista e Obstetra"
                width={40}
                height={40}
                className="h-8 w-auto md:h-10"
                loading="lazy"
              />
              <span className="text-lg md:text-xl font-bold">Dra. Karla Saraiva</span>
            </div>

            <address className="space-y-2 sm:space-y-2.5 text-center md:text-left not-italic">
              <div className="flex items-start gap-2 justify-center md:justify-start">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm">
                  Rua Bento de Andrade, 278 - Lalutie Clinic - Jardim Paulista, São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href="tel:+5511962094662" className="text-xs sm:text-sm hover:underline">
                  (11) 96209-4662
                </a>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Clock className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="text-xs sm:text-sm">Segunda a Sexta: 8h às 18h</span>
              </div>
            </address>

            <div className="flex flex-col items-center md:items-end gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/dra.karlasaraiva/"
                className="hover:text-white/80 transition-colors"
                aria-label="Siga a Dra. Karla Saraiva no Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <Button asChild size="sm" className="bg-white text-[#8a7267] hover:bg-white/90 w-full md:w-auto h-10">
                <a
                  href="https://wa.me/5511962094662?text=Olá! Gostaria de agendar uma consulta com a Dra. Karla Saraiva."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar consulta via WhatsApp"
                >
                  Agende sua Consulta
                </a>
              </Button>
            </div>
          </div>

          <div className="border-t border-white/20 mt-6 pt-6 text-center text-xs sm:text-sm">
            <p>© {new Date().getFullYear()} Dra. Karla Saraiva. Todos os direitos reservados.</p>
            <p className="mt-1">CRM: 208027 | RQE: 127957</p>
            <p className="mt-2 text-white/70">Ginecologista e Obstetra em São Paulo - Lalutie Clinic, Jardim Paulista</p>
          </div>
        </div>
      </footer>

      {/* Botão flutuante de WhatsApp - Otimizado para mobile */}
      <a
        href="https://wa.me/5511962094662?text=Olá! Gostaria de agendar uma consulta com a Dra. Karla Saraiva."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contato via WhatsApp com Dra. Karla Saraiva"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] text-white p-3 sm:p-3.5 rounded-full shadow-xl hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none touch-manipulation"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  )
}

// Sample data
const services = [
  {
    title: "Pré Natal Alto Risco",
    description:
      "Acompanhamento especializado para gestações que necessitam de cuidados médicos intensivos e monitoramento contínuo.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c0a080]"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
  },
  {
    title: "Pré Natal Baixo Risco",
    description:
      "Acompanhamento completo da gestação de baixo risco, garantindo saúde e bem-estar para a mãe e o bebê.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c0a080]"
        aria-hidden="true"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
  },
  {
    title: "Parto Normal e Cesárea",
    description: "Assistência completa ao parto, seja normal ou cesárea, priorizando a segurança da mãe e do bebê.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c0a080]"
        aria-hidden="true"
      >
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
      </svg>
    ),
  },
  {
    title: "Consulta Pós Parto",
    description:
      "Acompanhamento médico após o parto para garantir a recuperação saudável da mãe e orientações sobre cuidados.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c0a080]"
        aria-hidden="true"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    ),
  },
  {
    title: "Planejamento Gestacional",
    description:
      "Orientação e preparação para uma gravidez saudável, incluindo exames pré-concepcionais e aconselhamento.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c0a080]"
        aria-hidden="true"
      >
        <path d="M17 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    title: "Rotina Ginecológica",
    description: "Consultas preventivas e de rotina para manutenção da saúde ginecológica e prevenção de doenças.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c0a080]"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6"></path>
        <path d="m15.5 3.5-1.5 1.5m0 6-1.5 1.5M9 12l-1.5-1.5M3.5 15.5 5 14"></path>
      </svg>
    ),
  },
  {
    title: "Inserção de DIU e Implanon",
    description:
      "Procedimentos para inserção de métodos contraceptivos de longa duração, como DIU e implante hormonal.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#c0a080]"
        aria-hidden="true"
      >
        <path d="M2 12h1"></path>
        <path d="M6 12h1"></path>
        <path d="M10 12h1"></path>
        <path d="M14 12h1"></path>
        <path d="M18 12h1"></path>
        <path d="M22 12h1"></path>
        <path d="M12 2v1"></path>
        <path d="M12 6v1"></path>
        <path d="M12 10v1"></path>
        <path d="M12 18v1"></path>
        <path d="M12 22v1"></path>
      </svg>
    ),
  },
]

const faqs = [
  {
    question: "Como funciona o agendamento de consultas?",
    answer:
      "O agendamento pode ser feito diretamente pelo WhatsApp (11) 96209-4662 ou através dos links de agendamento disponíveis no site. Nossa equipe responderá durante o horário comercial para confirmar sua consulta.",
  },
  {
    question: "Quais convênios são aceitos?",
    answer:
      "Atualmente, a Dra. Karla Saraiva atende de forma particular, desse modo consegue dar uma melhor atenção para suas necessidades, atualizar a rotina e, ainda, temos a possibilidade de solicitação de exames e reembolso pelo seu convênio.",
  },
  {
    question: "O que devo levar na primeira consulta?",
    answer:
      "Para uma primeira consulta, é importante trazer seus documentos pessoais, carteirinha de Pré Natal (se já tiver), exames anteriores e anotações sobre seu histórico médico, medicamentos de uso e dúvidas que você deseja esclarecer.",
  },
  {
    question: "Qual a duração média de uma consulta?",
    answer:
      "As consultas têm duração média de 60 minutos e contam com ultrassom disponivel em sala. Valorizamos um atendimento completo e personalizado para cada paciente.",
  },
]
