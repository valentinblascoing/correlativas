const curriculumData = [
  // AÑO 1 - Cuatrimestre 1
  { id: '5551', label: 'ANALISIS MATEMATICO I', year: 1, term: 1, deps: [] },
  { id: '5912', label: 'ELEMENTOS DE ALGEBRA Y DE GEOMETRIA', year: 1, term: 1, deps: [] },
  { id: '5793', label: 'RESOLUCION DE PROBLEMAS Y ALGORITMOS', year: 1, term: 1, deps: [] },
  // AÑO 1 - Cuatrimestre 2
  { id: '7714', label: 'INTRODUCCION A LA INGENIERIA DE SOFTWARE', year: 1, term: 2, deps: [] },
  { id: '7713', label: 'INTRODUCCION A LA PROGRAMACION ORIENTADA A OBJETOS', year: 1, term: 2, deps: [
    { id: '5793', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '5912', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  { id: '7791', label: 'LENGUAJES FORMALES Y AUTOMATAS', year: 1, term: 2, deps: [
    { id: '5793', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '5912', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  // AÑO 2 - Cuatrimestre 1
  { id: '5552', label: 'ANALISIS MATEMATICO II', year: 2, term: 1, deps: [
    { id: '5551', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '5912', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  { id: '7655', label: 'ESTRUCTURAS DE DATOS', year: 2, term: 1, deps: [
    { id: '5551', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '5793', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7713', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  { id: '7949', label: 'TEORIA DE LA COMPUTABILIDAD', year: 2, term: 1, deps: [
    { id: '5912', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7713', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7791', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  // AÑO 2 - Cuatrimestre 2
  { id: 'I0022', label: 'Examen de Suficiencia de Idioma Inglés', year: 2, term: 2, deps: [] },
  { id: '7821', label: 'MODELOS DE SOFTWARE', year: 2, term: 2, deps: [
    { id: '7713', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7714', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7791', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  { id: '7820', label: 'MODELOS ESTADISTICOS PARA CIENCIAS DE LA COMPUTACION', year: 2, term: 2, deps: [
    { id: '5551', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '5793', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7791', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  { id: '5744', label: 'ORGANIZACION DE COMPUTADORAS', year: 2, term: 2, deps: [
    { id: '7655', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7713', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7791', cursar: 'Cursada', rendir: 'Aprobada' }
  ]},
  { id: '7951', label: 'TECNOLOGIA DE PROGRAMACION', year: 2, term: 2, deps: [
    { id: '7655', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7713', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  // AÑO 3 - Cuatrimestre 1
  { id: '5561', label: 'ARQUITECTURA DE COMPUTADORAS', year: 3, term: 1, deps: [
    { id: '5744', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7791', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '5704', label: 'LOGICA PARA CIENCIAS DE LA COMPUTACION', year: 3, term: 1, deps: [
    { id: '7949', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7951', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7911', label: 'REQUERIMIENTOS DE SISTEMAS', year: 3, term: 1, deps: [
    { id: '7655', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7821', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7951', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  // AÑO 3 - Cuatrimestre 2
  { id: '7552', label: 'BASES DE DATOS', year: 3, term: 2, deps: [
    { id: '5704', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7821', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7911', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7811', label: 'METODOS FORMALES PARA INGENIERIA DE SOFTWARE', year: 3, term: 2, deps: [
    { id: '5704', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7821', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7911', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7951', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '6601', label: 'QUIMICA IS', year: 3, term: 2, deps: [
    { id: '5551', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '5949', label: 'SISTEMAS OPERATIVOS', year: 3, term: 2, deps: [
    { id: '5561', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '5744', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  // AÑO 4 - Cuatrimestre 1
  { id: '5523', label: 'ALGORITMOS Y COMPLEJIDAD', year: 4, term: 1, deps: [
    { id: '5704', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7951', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7527', label: 'ARQUITECTURA Y DISEÑO DE SISTEMAS', year: 4, term: 1, deps: [
    { id: '7552', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7811', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7911', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7680', label: 'INGENIERIA DE APLICACIONES DE WEB', year: 4, term: 1, deps: [
    { id: '5949', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7552', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7911', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  // AÑO 4 - Cuatrimestre 2
  { id: 'I0023', label: 'Examen Integral de Idioma Inglés ISS', year: 4, term: 2, deps: [] },
  { id: '3051', label: 'FISICA I', year: 4, term: 2, deps: [
    { id: '5551', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '5912', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7891', label: 'PROYECTOS DE SISTEMAS DE SOFTWARE', year: 4, term: 2, deps: [
    { id: '7527', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7552', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7993', label: 'VERIFICACION Y VALIDACION DE SOFTWARE', year: 4, term: 2, deps: [
    { id: '5523', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7527', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7811', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  // AÑO 5 - Cuatrimestre 1
  { id: '2115', label: 'ECONOMIA DE LA EMPRESA ISS', year: 5, term: 1, deps: [
    { id: '7891', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0023', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7668', label: 'GESTION DE CALIDAD EN EL SOFTWARE', year: 5, term: 1, deps: [
    { id: '7527', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7891', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '7993', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0023', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7886', label: 'PRACTICA PROFESIONAL SUPERVISADA', year: 5, term: 1, deps: [
    { id: 'I0022', cursar: null, rendir: 'Aprobada' },
    { id: 'I0023', cursar: null, rendir: 'Aprobada' }
  ]},
  { id: '7903', label: 'REDES DE COMPUTADORAS', year: 5, term: 1, deps: [
    { id: '5561', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '5949', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0023', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  // AÑO 5 - Cuatrimestre 2
  { id: '7534', label: 'AUDITORIA DE SISTEMAS', year: 5, term: 2, deps: [
    { id: '7891', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0023', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '3058', label: 'FISICA II IS', year: 5, term: 2, deps: [
    { id: '3051', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: '5552', cursar: 'Cursada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0023', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]},
  { id: '7895', label: 'PROYECTO FINAL', year: 5, term: 2, deps: [
    { id: '7886', cursar: null, rendir: 'Aprobada' },
    { id: 'I0022', cursar: null, rendir: 'Aprobada' },
    { id: 'I0023', cursar: null, rendir: 'Aprobada' }
  ]},
  { id: '7922', label: 'SISTEMAS INTELIGENTES ARTIFICIALES', year: 5, term: 2, deps: [
    { id: '7552', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: '7820', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0022', cursar: 'Aprobada', rendir: 'Aprobada' },
    { id: 'I0023', cursar: 'Aprobada', rendir: 'Aprobada' }
  ]}
];