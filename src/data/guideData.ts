export interface GuideStep {
  id: string;
  title: string;
  description: string;
  images: string[];
  copyFormat?: {
    label: string;
    value: string;
  };
}

export interface GuideStage {
  id: number;
  shortTitle: string;
  title: string;
  intro: string;
  steps: GuideStep[];
}

export const IMAGE_MAP: Record<string, string> = {
  'image1.png': '/assets/aistudio/image1_aed4292f.png',
  'image2.png': '/assets/aistudio/image2_3655bf44.png',
  'image3.png': '/assets/aistudio/image3_ff64aa5c.png',
  'image4.png': '/assets/aistudio/image4_45535e54.png',
  'image6.png': '/assets/aistudio/image6_79764982.png',
  'image7.png': '/assets/aistudio/image7_1773039c.png',
  'image8.png': '/assets/aistudio/image8_0423191d.png',
  'image9.png': '/assets/aistudio/image9_97ff23f2.png',
  'image10.png': '/assets/aistudio/image10_60845d47.png',
  'image11.png': '/assets/aistudio/image11_acbf9770.png',
  'image12.png': '/assets/aistudio/image12_2cc10612.png',
  'image13.png': '/assets/aistudio/image13_02457923.png',
  'image14.png': '/assets/aistudio/image14_86a383be.png',
  'image15.png': '/assets/aistudio/image15_81d5e81c.png',
  'image16.png': '/assets/aistudio/image16_df58dfe9.png',
  'image17.png': '/assets/aistudio/image17_349c4783.png',
  'image18.png': '/assets/aistudio/image18_eb6599c3.png',
  'image19.png': '/assets/aistudio/image19_ce8b5731.png',
  'image20.png': '/assets/aistudio/image20_7d72a2ca.png',
  'image21.png': '/assets/aistudio/image21_dc3724fb.png',
  'image22.png': '/assets/aistudio/image22_af28cf6d.png',
  'image23.png': '/assets/aistudio/image23_91800e1a.png',
  'image24.png': '/assets/aistudio/image24_7e907d0f.png',
  'image25.png': '/assets/aistudio/image25_935d5f4b.png',
  'image26.png': '/assets/aistudio/image26_5e1fbff8.png',
  'image27.png': '/assets/aistudio/image27_9a973794.png',
  'image28.png': '/assets/aistudio/image28_8c1ab707.png',
  'image29.png': '/assets/aistudio/image29_eccdec4a.png',
  'image30.png': '/assets/aistudio/image30_3acf7dfe.png',
  'image31.png': '/assets/aistudio/image31_b2c8da09.png',
  'image32.png': '/assets/aistudio/image32_2d549fde.png',
  'image33.png': '/assets/aistudio/image33_5f6d4a0d.png',
  'image34.png': '/assets/aistudio/image34_b3bafedb.png',
  'image35.png': '/assets/aistudio/image35_0dec4883.png',
  'image36.png': '/assets/aistudio/image36_f393ea84.png',
  'image37.png': '/assets/aistudio/image37_98c89199.png',
  'image38.png': '/assets/aistudio/image38_b2a95d48.png',
  'image39.png': '/assets/aistudio/image39_99c2d966.png',
  'image40.png': '/assets/aistudio/image40_41a9872d.png',
  'image41.png': '/assets/aistudio/image41_e4b2fb82.png',
  'image42.png': '/assets/aistudio/image42_2d0c52a5.png',
  'image43.png': '/assets/aistudio/image43_e46d946f.png',
  'image44.png': '/assets/aistudio/image44_5a7e1cfd.png',
  'image45.png': '/assets/aistudio/image45_02042776.png',
  'image46.png': '/assets/aistudio/image46_faeaec59.png',
  'image47.png': '/assets/aistudio/image47_8919ae53.png',
  'image48.png': '/assets/aistudio/image48_b40e215e.png',
  'image49.png': '/assets/aistudio/image49_03be70c6.png',
  'image50.png': '/assets/aistudio/image50_208f562a.png',
  'image51.png': '/assets/aistudio/image51_ba13b7ab.png',
  'image52.png': '/assets/aistudio/image52_5a4ee274.png',
  'image53.png': '/assets/aistudio/image53_a724d824.png',
  'image54.png': '/assets/aistudio/image54_513b62cd.png',
  'image55.png': '/assets/aistudio/image55_d4855f48.png',
  'image56.png': '/assets/aistudio/image56_7c3d0f87.png',
  'image57.png': '/assets/aistudio/image57_45346e69.png',
  'image58.png': '/assets/aistudio/image58_c9deba1f.png',
  'image59.png': '/assets/aistudio/image59_c705bc00.png',
  'image60.png': '/assets/aistudio/image60_3323592c.png',
  'image61.png': '/assets/aistudio/image61_f767feb3.png',
  'image62.png': '/assets/aistudio/image62_a41d1ca8.png',
};

export function resolveImageUrl(fileName: string): string {
  return IMAGE_MAP[fileName] || `/assets/aistudio/${fileName}`;
}

export const NOTICE_INFO = {
  title: 'Antes de empezar',
  body: 'El documento fuente menciona unir archivos en un servicio web externo. Los reclamos pueden contener datos personales: use únicamente herramientas aprobadas por su organismo para tratar esa documentación.',
};

export const GUIDE_NOTES = [
  'La guía funciona sin conexión una vez instalada o cargada en el dispositivo. El avance marcado se guarda en el almacenamiento local del navegador.',
  'Las capturas provienen del instructivo proporcionado y se amplían al seleccionarlas con soporte de zoom.',
  'Revise siempre el procedimiento vigente de su organismo antes de procesar o notificar documentación.',
];

export const QUICK_FORMATS = [
  {label: 'Motivo de carátula', value: 'N.º/año – denunciante c/denunciado'},
  {label: 'Código de trámite', value: 'MDP00002'},
  {label: 'Tipo Primer Decreto', value: 'PDREC'},
  {label: 'Referencia Primer Decreto', value: 'N.º expediente/año - Primer Decreto'},
  {label: 'Designación de repartición', value: 'DPDC#MPD'},
  {label: 'Archivo PDF unificado', value: 'N.º/año - RECLAMO INICIAL Y DOCUMENTAL'},
  {label: 'Tipo Copia Digitalizada', value: 'COPDI'},
];

const RAW_STAGES: Array<{
  shortTitle: string;
  title: string;
  intro: string;
  steps: Array<{
    title: string;
    description: string;
    images: string[];
    copyFormat?: {label: string; value: string};
  }>;
}> = [
  {
    shortTitle: 'Solicitud',
    title: 'Crear la solicitud de carátula',
    intro:
      'Inicie el trámite desde Expedientes Electrónicos y genere la solicitud de carátula para que la tome el agente correspondiente.',
    steps: [
      {
        title: 'Ingresar al módulo',
        description: 'Desde la Intranet Suelo, abra el módulo Expedientes Electrónicos (EE).',
        images: ['image2.png'],
      },
      {
        title: 'Elegir Carátula',
        description: 'Seleccione la opción Carátula para abrir el formulario de solicitud.',
        images: ['image45.png'],
      },
      {
        title: 'Completar los motivos',
        description:
          'En Motivo Interno y Motivo Externo use el formato: N.º de expediente/año – denunciante c/denunciado. El Word muestra un ejemplo; reemplace esos datos por los del caso.',
        images: ['image35.png', 'image57.png'],
        copyFormat: {
          label: 'Formato de motivo',
          value: 'N.º/año – denunciante c/denunciado',
        },
      },
      {
        title: 'Seleccionar el código de trámite',
        description:
          'En Código de Trámite busque “MDP” y elija “Reclamo - Defensa del Consumidor”.',
        images: ['image61.png'],
        copyFormat: {
          label: 'Código de trámite',
          value: 'MDP00002',
        },
      },
      {
        title: 'Solicitar la carátula',
        description:
          'Presione Carátula. En la ventana siguiente, marque Usuario, busque el agente y seleccione Enviar Solicitud.',
        images: ['image29.png', 'image1.png', 'image44.png', 'image31.png'],
      },
      {
        title: 'Verificar la solicitud',
        description: 'Confirme en el sistema que la solicitud de carátula quedó creada.',
        images: ['image62.png'],
      },
    ],
  },
  {
    shortTitle: 'Caratular',
    title: 'Tramitar y completar la carátula',
    intro:
      'Una vez creada la solicitud, tramite la carátula, complete los datos de las partes y guarde para crear el expediente digital.',
    steps: [
      {
        title: 'Abrir la solicitud',
        description: 'En Acciones, seleccione Tramitar.',
        images: ['image52.png', 'image46.png'],
      },
      {
        title: 'Copiar el motivo',
        description:
          'En Descripción Adicional del Trámite copie el motivo informado en la solicitud y presione Carátula.',
        images: ['image17.png', 'image6.png'],
      },
      {
        title: 'Completar los datos',
        description:
          'Confirme la ventana de ingreso y complete el formulario. En el ejemplo del Word, la parte denunciada es una persona jurídica.',
        images: ['image14.png', 'image10.png', 'image16.png'],
      },
      {
        title: 'Guardar y registrar el número',
        description:
          'Guarde la carátula. El sistema crea el expediente digital y le asigna un número; consérvelo para los pasos siguientes.',
        images: ['image32.png', 'image59.png', 'image12.png'],
      },
    ],
  },
  {
    shortTitle: 'Decreto',
    title: 'Crear el primer decreto en GEDO',
    intro:
      'Genere el documento “Primer Decreto”, complete referencia y datos del expediente, y fírmelo con el certificado correspondiente.',
    steps: [
      {
        title: 'Abrir GEDO',
        description: 'Desde Módulos, seleccione GEDO y comience la producción de un documento.',
        images: ['image36.png', 'image28.png'],
      },
      {
        title: 'Buscar el tipo de documento',
        description:
          'Busque el código PDREC, seleccione Primer Decreto y elija producir yo mismo.',
        images: ['image11.png', 'image38.png'],
        copyFormat: {
          label: 'Código de documento',
          value: 'PDREC',
        },
      },
      {
        title: 'Completar referencia y expediente',
        description:
          'Use la referencia “N.º expediente/año - Primer Decreto”. Complete los campos con los datos del expediente digital asignado. El tutorial identifica EX como expediente e indica año, número y designación DPDC#MPD.',
        images: ['image37.png', 'image24.png', 'image59.png', 'image27.png', 'image48.png'],
        copyFormat: {
          label: 'Referencia Primer Decreto',
          value: 'N.º expediente/año - Primer Decreto',
        },
      },
      {
        title: 'Completar datos y firmar',
        description:
          'Complete los datos del denunciado y, si corresponde, la fecha de audiencia. Seleccione Firmar yo mismo el Documento y luego firme con certificado.',
        images: ['image34.png', 'image4.png', 'image7.png'],
      },
    ],
  },
  {
    shortTitle: 'Unir PDF',
    title: 'Preparar el reclamo y la documental',
    intro:
      'Ubique los archivos del expediente y reúna el reclamo inicial con su documental en un solo PDF, dejando el reclamo primero.',
    steps: [
      {
        title: 'Ubicar los archivos',
        description:
          'En la carpeta compartida indicada por el organismo, entre al año correspondiente y localice la carpeta del expediente.',
        images: ['image41.png'],
      },
      {
        title: 'Unir los PDF con una herramienta aprobada',
        description:
          'El tutorial muestra iLovePDF para unir documentos. Antes de cargar documentación con datos personales, confirme que el servicio esté autorizado por su organismo; si no, use la herramienta institucional aprobada.',
        images: ['image58.png', 'image56.png'],
      },
      {
        title: 'Seleccionar y ordenar los documentos',
        description:
          'Agregue el reclamo inicial y la documental. Ordene el archivo “Reclamo Inicial” primero y verifique el orden antes de unirlos.',
        images: ['image13.png', 'image15.png', 'image53.png'],
      },
      {
        title: 'Guardar el PDF unido',
        description:
          'Descargue el archivo combinado y guárdelo en la carpeta del expediente con el formato “N.º/año - RECLAMO INICIAL Y DOCUMENTAL”.',
        images: ['image60.png', 'image54.png', 'image49.png'],
        copyFormat: {
          label: 'Nombre de archivo',
          value: 'N.º/año - RECLAMO INICIAL Y DOCUMENTAL',
        },
      },
    ],
  },
  {
    shortTitle: 'COPDI',
    title: 'Generar la documental en GEDO',
    intro:
      'Convierta el PDF unificado en un documento GEDO tipo COPDI y fírmelo digitalmente.',
    steps: [
      {
        title: 'Iniciar un nuevo GEDO',
        description: 'Vuelva a GEDO, busque COPDI y seleccione producir yo mismo.',
        images: ['image28.png', 'image50.png', 'image38.png', 'image39.png'],
        copyFormat: {
          label: 'Código COPDI',
          value: 'COPDI',
        },
      },
      {
        title: 'Adjuntar y firmar',
        description:
          'Seleccione el PDF unido, elija Firmar yo mismo el Documento y complete la firma con certificado.',
        images: ['image8.png', 'image4.png', 'image7.png'],
      },
      {
        title: 'Confirmar los dos GEDO',
        description:
          'Al terminar debe contar con el Primer Decreto y el Reclamo Inicial y Documental generados en GEDO.',
        images: ['image4.png'],
      },
    ],
  },
  {
    shortTitle: 'Vincular',
    title: 'Vincular documentos al expediente',
    intro:
      'Agregue primero el Primer Decreto y después el Reclamo Inicial y Documental. Revise el orden antes de guardar.',
    steps: [
      {
        title: 'Abrir y tramitar el expediente',
        description:
          'Vuelva a Expedientes Electrónicos, busque el expediente digital y entre a tramitarlo.',
        images: ['image2.png', 'image9.png', 'image22.png'],
      },
      {
        title: 'Abrir búsqueda de documentos',
        description:
          'Seleccione Búsqueda de Documentos e indique el rango de fechas de creación. Si no recuerda el día exacto, el tutorial sugiere ampliar el rango.',
        images: ['image19.png', 'image20.png'],
      },
      {
        title: 'Agregar primero el Primer Decreto',
        description:
          'Busque el GEDO, marque el Primer Decreto y agréguelo. Verifique que aparezca en el orden indicado por el sistema (el tutorial lo muestra como orden 3).',
        images: ['image33.png', 'image23.png', 'image3.png', 'image30.png'],
      },
      {
        title: 'Agregar la documental y guardar',
        description:
          'Repita la búsqueda para Reclamo Inicial y Documental. Verifique que quede después del decreto (el tutorial muestra orden 4) y presione Guardar.',
        images: [
          'image19.png',
          'image20.png',
          'image40.png',
          'image23.png',
          'image3.png',
          'image25.png',
          'image26.png',
        ],
      },
    ],
  },
  {
    shortTitle: 'Notificar',
    title: 'Notificar y cargar la constancia',
    intro:
      'Descargue los documentos firmados, notifique a las partes según el procedimiento institucional y cargue la constancia en el expediente.',
    steps: [
      {
        title: 'Descargar documentos firmados',
        description:
          'Descargue el Primer Decreto y el Reclamo Inicial y Documental firmados. Guárdelos en la carpeta del reclamo con nombres que permitan identificar el expediente y el contenido.',
        images: ['image9.png', 'image22.png'],
      },
      {
        title: 'Enviar la notificación',
        description:
          'Desde el expediente, abra la opción de notificación. Ingrese el correo oficial de notificaciones, agregue a las partes y adjunte ambos documentos firmados. Complete el asunto con la identificación del expediente y envíe.',
        images: ['image51.png', 'image55.png'],
      },
      {
        title: 'Guardar la constancia enviada',
        description:
          'Abra Enviados, imprima o guarde en PDF la constancia de notificación y consérvela en la carpeta del expediente.',
        images: ['image43.png', 'image18.png', 'image42.png'],
      },
      {
        title: 'Generar la constancia en GEDO',
        description:
          'En GEDO, genere un COPDI para la constancia, adjunte el PDF y fírmelo con certificado siguiendo el flujo habitual.',
        images: [
          'image28.png',
          'image50.png',
          'image38.png',
          'image21.png',
          'image8.png',
          'image4.png',
          'image7.png',
        ],
      },
      {
        title: 'Vincular la constancia al expediente',
        description:
          'Vuelva a tramitar el expediente, busque el documento por fecha y agréguelo. El tutorial lo muestra en el orden 5. Presione Guardar para conservar los cambios.',
        images: [
          'image9.png',
          'image22.png',
          'image19.png',
          'image20.png',
          'image47.png',
          'image3.png',
          'image25.png',
        ],
      },
    ],
  },
];

export const GUIDE_STAGES: GuideStage[] = RAW_STAGES.map((stage, si) => ({
  id: si,
  shortTitle: stage.shortTitle,
  title: stage.title,
  intro: stage.intro,
  steps: stage.steps.map((step, ti) => ({
    id: `${si}-${ti}`,
    title: step.title,
    description: step.description,
    images: step.images,
    copyFormat: step.copyFormat,
  })),
}));

export const TOTAL_STEPS = GUIDE_STAGES.reduce((acc, s) => acc + s.steps.length, 0);
